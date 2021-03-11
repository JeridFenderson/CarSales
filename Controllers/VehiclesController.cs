using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarSales.Models;

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

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public VehiclesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Vehicles
        //
        // Returns a list of all your Vehicles
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
        {
            // Uses the database context in `_context` to request all of the Vehicles, sort
            // them by row id and return them as a JSON array.
            return await _context.Vehicles.OrderBy(row => row.Id).ToListAsync();
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
            var vehicle = await _context.Vehicles.FindAsync(id);

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
        public async Task<IActionResult> PutVehicle(int id, Vehicle vehicle)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != vehicle.Id)
            {
                return BadRequest();
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
        public async Task<ActionResult<Vehicle>> PostVehicle(Vehicle vehicle)
        {
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
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            // Find this vehicle by looking for the specific id
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                // There wasn't a vehicle with that id so return a `404` not found
                return NotFound();
            }

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
    }
}
