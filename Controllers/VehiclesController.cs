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
    // All of these routes will be at the base URL:     /api/Vehicles
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case VehiclesController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;
        private readonly string CLOUDINARY_CLOUD_NAME;
        private readonly string CLOUDINARY_API_KEY;
        private readonly string CLOUDINARY_API_SECRET;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public VehiclesController(DatabaseContext context, IConfiguration config)
        {
            _context = context;
            CLOUDINARY_CLOUD_NAME = config["CLOUDINARY_CLOUD_NAME"];
            CLOUDINARY_API_KEY = config["CLOUDINARY_API_KEY"];
            CLOUDINARY_API_SECRET = config["CLOUDINARY_API_SECRET"];
        }

        // GET: api/Vehicles
        //
        // Returns a list of all your Vehicles
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles(string filterMake)
        {
            // Uses the database context in `_context` to request all of the Vehicles, sort
            // them by row id and return them as a JSON array.
            if (filterMake == null)
            {
                return await _context.Vehicles
                .Include(vehicle => vehicle.Photos)
                .Include(vehicle => vehicle.User)
                .ToListAsync();
            }
            else
            {
            return await _context.Vehicles
            .Include(vehicle => vehicle.User)
            .Where(vehicle => vehicle.Make.ToLower().Contains(filterMake.ToLower()))
            .ToListAsync();
            }        
        }

        // GET: api/Vehicles/5
        //
        // Fetches and returns a specific vehicle by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicle(int id)
        {
            // Find the vehicle in the database using `FindAsync` to look it up by id
            var vehicle = await _context.Vehicles
            .Include(vehicle => vehicle.Photos)
            .Include(vehicle => vehicle.User)
            .FirstOrDefaultAsync(vehicle => vehicle.Id == id);

            // If we didn't find anything, we receive a `null` in return
            if (vehicle == null)
            {
                // Return a `404` response to the client indicating we could not find a vehicle with this id
                return NotFound();
            }

            //  Return the vehicle as a JSON object.
            return vehicle;
        }

        // PUT: api/Vehicles/5
        //
        // Update an individual vehicle with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Vehicle
        // variable named vehicle. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Vehicle POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutVehicle(int id, Vehicle vehicle)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != vehicle.Id)
            {
                return BadRequest();
            }

             // Find the user information of the user that called a delete request
            var user = await _context.Users.FindAsync(GetCurrentUserId());
            if (!user.IsAdmin)
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
            _context.Entry(vehicle).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!VehicleExists(id))
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
            return Ok(vehicle);
        }

        // POST: api/Vehicles
        //
        // Creates a new vehicle in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Vehicle
        // variable named vehicle. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Vehicle POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Vehicle>> PostVehicle(Vehicle vehicle)
        {
            // Set the UserID to the current user id, this overrides anything the user specifies.
            vehicle.UserId = GetCurrentUserId();
            // Indicate to the database context we want to add this new record
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetVehicle", new { id = vehicle.Id }, vehicle);
        }

        // DELETE: api/Vehicles/5
        //
        // Deletes an individual vehicle with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            // Find this vehicle by looking for the specific id
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                // There wasn't a vehicle with that id so return a `404` not found
                return NotFound();
            }

            // Find the user information of the user that called a delete request
            var user = await _context.Users.FindAsync(GetCurrentUserId());
            if (!user.IsOwner)
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

            // Caputes photos id's of the vehicle being deleted
            var photos = vehicle.Photos
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
            _context.Vehicles.Remove(vehicle);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(vehicle);
        }

        // Private helper method that looks up an existing vehicle by the supplied id
        private bool VehicleExists(int id)
        {
            return _context.Vehicles.Any(vehicle => vehicle.Id == id);
        }

        // Private helper method to get the JWT claim related to the user ID
        private int GetCurrentUserId()
        {
            // Get the User Id from the claim and then parse it as an integer.
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }

        // Private helper method that deletes
        // private async System.Threading.Tasks.Task<ActionResult> UploadAsync(IFormFile file)
    }
}
