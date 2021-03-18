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
            .Include(media => media.User)
            .Where(media => media.UserId > -1 && !media.IsMaster)
            .ToListAsync();   
        }

        [HttpGet("Master")]
        public async Task<ActionResult<Media>> GetMedia()
        {
            // Uses the database context in `_context` to request all of the Media, sort
            // them by row id and return them as a JSON array.
            return await _context.Media
            .Include(media => media.User)
            .FirstOrDefaultAsync(media => media.IsMaster);
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
        public async System.Threading.Tasks.Task<ActionResult> UploadAsync(IFormFile file)
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
                File = new FileDescription(file.FileName, file.OpenReadStream())
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
    }
}