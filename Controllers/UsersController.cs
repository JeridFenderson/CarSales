using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarSales.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Configuration;

namespace CarSales.Controllers
{
    // All of these routes will be at the base URL:     /api/Users
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case UsersController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;
         private readonly string CLOUDINARY_CLOUD_NAME;
        private readonly string CLOUDINARY_API_KEY;
        private readonly string CLOUDINARY_API_SECRET;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        // Constructor that receives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public UsersController(DatabaseContext context, IConfiguration config)
        {
            _context = context;
            CLOUDINARY_CLOUD_NAME = config["CLOUDINARY_CLOUD_NAME"];
            CLOUDINARY_API_KEY = config["CLOUDINARY_API_KEY"];
            CLOUDINARY_API_SECRET = config["CLOUDINARY_API_SECRET"];
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
             var response = new
            {
                status = 401,
                errors = new List<string>() { "Not Authorized" }
            };
             // Find the user information of the user that called a delete request
            var currentUser = await _context.Users.FindAsync(GetCurrentUserId());
            if (!currentUser.IsOwner)
            {
                // Return our error with the custom response
                return Unauthorized(response);
            }
            // Uses the database context in `_context` to request all of the Media, sort
            // them by row id and return them as a JSON array.
            return await _context.Users.ToListAsync();   
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<User>> GetUser(int id)
        {
             var response = new
            {
                status = 401,
                errors = new List<string>() { "Not Authorized" }
            };
             // Find the user information of the user that called a delete request
            var currentUser = await _context.Users.FindAsync(GetCurrentUserId());
            if (!currentUser.IsOwner || id != GetCurrentUserId())
            {
                // Return our error with the custom response
                return Unauthorized(response);
            }
            // Uses the database context in `_context` to request all of the Media, sort
            // them by row id and return them as a JSON array.
            return await _context.Users.FirstOrDefaultAsync(user => user.Id == id); 
        }

        // PUT: api/Users/5
        //
        // Update an individual user with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a User
        // variable named user. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our User POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != user.Id)
            {
                return BadRequest();
            }

            // Make a custom error response
            var response = new
            {
                status = 401,
                errors = new List<string>() { "Not Authorized" }
            };
             // Find the user information of the user that called a delete request
            var currentUser = await _context.Users.FindAsync(GetCurrentUserId());
            if (!currentUser.IsOwner || GetCurrentUserId() != id)
            {
                // Return our error with the custom response
                return Unauthorized(response);
            }

            if ((currentUser.IsAdmin != user.IsAdmin) && !currentUser.IsOwner)
            {
                    return Unauthorized(response);
            }
            if ((currentUser.IsOwner != user.IsOwner) && !currentUser.IsOwner)
            {
                    return Unauthorized(response);
            }

            // Tell the database to consider everything in user to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from user
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!UserExists(id))
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
            return Ok(user);
        }

        // POST: api/Users
        //
        // Creates a new user in the database.
        //
        // The `body` of the request is parsed and then made available to us as a User
        // variable named user. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our User POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            // Security measure overwrites front end entries for first time users
            user.IsAdmin = false;
            user.IsOwner = false;

            try
            {
                // Indicate to the database context we want to add this new record
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                // Return a response that indicates the object was created (status code `201`) and some additional
                // headers with details of the newly created object.
                return CreatedAtAction("GetUser", new { id = user.Id }, user);
            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateException)
            {
                // Make a custom error response
                var response = new
                {
                    status = 400,
                    errors = new List<string>() { "This account already exists!" }
                };
                // Return our error with the custom response
                return BadRequest(response);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteUser(string email)
        {
            var response = new
            {
                status = 404,
                errors = new List<string>() { "Account Not Found" }
            };

            // Find this user by looking for the specific id
            var user = await _context.Users.Include(user => user.Media).FirstOrDefaultAsync(user => user.Email == email);
            if (user == null)
            {
                // There wasn't a user with that id so return a `404` not found
                return NotFound(response);
            }

            // Caputes photos id's of the vehicle being deleted
            var photos = user.Media.Select(media => media.PublicId);
            
            // Removes Media Files From Cloudinary
            var cloudinaryClient = new Cloudinary(new Account(CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET));
            var delResParams = new DelResParams()
            {
            PublicIds = new List<string>(photos)
            };
            cloudinaryClient.DeleteResources(delResParams);

            // Tell the database we want to remove this record
            _context.Users.Remove(user);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(user);
        }

        // DELETE: api/Users/5
        //
        // Deletes an individual user with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{email}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteUserByEmail(string email)
        {
            var response = new
            {
                status = 404,
                errors = new List<string>() { "Account Not Found" }
            };

            var otherResponse = new
            {
                status = 401,
                errors = new List<string>() { "Not Authorized" }
            };

            // Find this user by looking for the specific id
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == email);
            if (user == null)
            {
                // There wasn't a user with that id so return a `404` not found
                return NotFound(response);
            }

            var currentUser = await _context.Users.FindAsync(GetCurrentUserId());
            if (!currentUser.IsOwner)
            {
                return Unauthorized(response);
            }

            // Caputes photos id's of the vehicle being deleted
            var photos = user.Media
            .Where(photo => photo.PublicId != "")
            .Select(photo => photo.PublicId).ToList();

            // Removes Media Files From Cloudinary
            var cloudinaryClient = new Cloudinary(new Account(CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET));
            var delResParams = new DelResParams()
            {
            PublicIds = new List<string>(photos)
            };
            cloudinaryClient.DeleteResources(delResParams);

            // Tell the database we want to remove this record
            _context.Users.Remove(user);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(user);
        }

        // Private helper method that looks up an existing user by the supplied id
        private bool UserExists(int id)
        {
            return _context.Users.Any(user => user.Id == id);
        }

        private int GetCurrentUserId()
        {
            // Get the User Id from the claim and then parse it as an integer.
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }
    }
}
