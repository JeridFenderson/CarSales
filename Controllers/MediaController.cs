using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using CarSales.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CarSales.Controllers
{
    // All of these routes will be at the base URL:     /api/Uploads
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case RestaurantsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly string CLOUDINARY_CLOUD_NAME;
        private readonly string CLOUDINARY_API_KEY;
        private readonly string CLOUDINARY_API_SECRET;
        private readonly HashSet<string> VALID_CONTENT_TYPES = new HashSet<string> {
            "image/jpg",
            "image/jpeg",
            "image/pjpeg",
            "image/gif",
            "image/x-png",
            "image/png",
        };

        // Constructor that receives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public MediaController(DatabaseContext context, IConfiguration config)
        {
            _context = context;
            CLOUDINARY_CLOUD_NAME = config["CLOUDINARY_CLOUD_NAME"];
            CLOUDINARY_API_KEY = config["CLOUDINARY_API_KEY"];
            CLOUDINARY_API_SECRET = config["CLOUDINARY_API_SECRET"];
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media>>> GetAllMedia()
        {
            // Uses the database context in `_context` to request all of the Media, sort
            // them by row id and return them as a JSON array.
            return await _context.Media
            .ToListAsync();   
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutMedia(int id, Media media)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != media.Id)
            {
                return BadRequest();
            }

             // Find the user information of the user that called a delete request
            var user = await _context.Users.FindAsync(GetCurrentUserId());
            if (user.Role != "ADMIN")
            {
                // Make a custom error response
                var response = new
                {
                    status = 401,
                    errors = new List<string>() { "Not Authorized" }
                };

                // Return our error with the custom response
                return Unauthorized(response);
            }

            // Tell the database to consider everything in vehicle to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from vehicle
            _context.Entry(media).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!MediaExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(media);
        }

        // POST: api/Uploads
        //
        // Creates a new uploaded file
        //
        // The `body` of the request is parsed and then made available to us as a User
        // variable named user. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our User POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [RequestSizeLimit(10_000_000)]
        public async Task<ActionResult> UploadAsync(IFormFile file)
        {
            // Check this content type against a set of allowed content types
            var contentType = file.ContentType.ToLower();
            if (!VALID_CONTENT_TYPES.Contains(contentType))
            {
                // Return a 400 Bad Request when the content type is not allowed
                return BadRequest("Not Valid Image");
            }

            // Create and configure a client object to be able to upload to Cloudinary
            var cloudinaryClient = new Cloudinary(new Account(CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET));

            // Create an object describing the upload we are going to process.
            // We will provide the file name and the stream of the content itself.
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
                PublicId = "CarSales"
            };

            // Upload the file to the server
            ImageUploadResult result = await cloudinaryClient.UploadLargeAsync(uploadParams);

            // If the status code is a "OK" then the upload was accepted so we will return
            // the URL to the client
            if (result.StatusCode == HttpStatusCode.OK)
            {

                return Ok(new { photo = result });
            }
            else
            {
                // Otherwise there was some failure in uploading
                return BadRequest("Upload failed");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteMedia(int id)
        {
            var response = new
            {
                status = 404,
                errors = new List<string>() { "Not Found" }
            };
            // Find this user by looking for the specific id
            var photo = await _context.Media.FirstOrDefaultAsync(photo => photo.Id == id);
            if (photo == null)
            {
                return NotFound(response);
            }

            var cloudPhoto = photo.PublicId;
             // Removes Media Files From Cloudinary
            var cloudinaryClient = new Cloudinary(new Account(CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET));
            var delResParams = new DelResParams()
            {
            PublicIds = new List<string>(){cloudPhoto}
            };
            cloudinaryClient.DeleteResources(delResParams);

            // Tell the database we want to remove this record
            _context.Media.Remove(photo);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(photo);
        }

         private bool MediaExists(int id)
        {
            return _context.Media.Any(media => media.Id == id);
        }

        private int GetCurrentUserId()
        {
            // Get the User Id from the claim and then parse it as an integer.
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }
    }
}