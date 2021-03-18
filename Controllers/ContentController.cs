using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarSales.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
    public class ContentController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly string CLOUDINARY_CLOUD_NAME;
        private readonly string CLOUDINARY_API_KEY;
        private readonly string CLOUDINARY_API_SECRET;
        public ContentController(DatabaseContext context, IConfiguration config)
        {
            _context = context;
            CLOUDINARY_CLOUD_NAME = config["CLOUDINARY_CLOUD_NAME"];
            CLOUDINARY_API_KEY = config["CLOUDINARY_API_KEY"];
            CLOUDINARY_API_SECRET = config["CLOUDINARY_API_SECRET"];
        }

        [HttpGet]
        public async Task<ActionResult<Content>> GetContent()
        {
                return await _context.Content.Include(content => content.BackgroundImage ).FirstOrDefaultAsync(content => content.Id == 0);    
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutContent(Content content)
        {
            // Make a custom error response
            var response = new
            {
                status = 401,
                errors = new List<string>() { "Not Authorized" }
            };
            var currentUser = await _context.Users.FindAsync(GetCurrentUserId());
            if (!currentUser.IsOwner)
            {
                // Return our error with the custom response
                return Unauthorized(response);
            }
            var currentContent = await _context.Content.FindAsync(0);

            if (currentContent.BackgroundImage != content.BackgroundImage)
            {
                // Removes Media Files From Cloudinary
                var cloudinaryClient = new Cloudinary(new Account(CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET));
                var delResParams = new DelResParams()
                {
                PublicIds = new List<string>(){currentContent.BackgroundImage.PublicId}
                };
                cloudinaryClient.DeleteResources(delResParams);
            }

            // Tell the database to consider everything in user to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from user
            _context.Entry(content).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!ContentExists())
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
            return Ok(content);
        }

        private bool ContentExists()
        {
            return _context.Content.Any(content => content.Id == 0);
        }

        private int GetCurrentUserId()
        {
            // Get the User Id from the claim and then parse it as an integer.
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }
    }
}