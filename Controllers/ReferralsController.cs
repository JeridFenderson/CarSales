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

namespace CarSales.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ReferralsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        // Constructor that receives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public ReferralsController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<Referral>>> GetReferrals()
        {
             var response = new
            {
                status = 401,
                errors = new List<string>() { "Not Authorized" }
            };
             // Find the user information of the user that called a delete request
            var user = await _context.Users.FindAsync(GetCurrentUserId());
            if (user.Tier < 2)
            {
                // Return our error with the custom response
                return Unauthorized(response);
            }
            // Uses the database context in `_context` to request all of the Media, sort
            // them by row id and return them as a JSON array.
            return await _context.Referrals
            .Where(referral => !referral.IsPaid && !referral.IsCredit)
            .ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<Referral>>> GetReferralsByIndividual()
        {
            // Uses the database context in `_context` to request all of the Media, sort
            // them by row id and return them as a JSON array.
            var referredUser = await _context.Users.FindAsync(GetCurrentUserId());

            return await _context.Referrals
            .Where(referral => (!referral.IsPaid && !referral.IsCredit) && referral.User == referredUser)
            .ToListAsync();
        }

        

        [HttpGet("all")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<Referral>>> GetAllReferrals()
        {
             var response = new
            {
                status = 401,
                errors = new List<string>() { "Not Authorized" }
            };
             // Find the user information of the user that called a delete request
            var user = await _context.Users.FindAsync(GetCurrentUserId());
            if (user.Tier < 3)
            {
                // Return our error with the custom response
                return Unauthorized(response);
            }
            // Uses the database context in `_context` to request all of the Media, sort
            // them by row id and return them as a JSON array.
            return await _context.Referrals.ToListAsync();
        }


        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Referral>> PutReferralsByIndividual(int id, Referral referral)
        {
             var response = new
            {
                status = 401,
                errors = new List<string>() { "Not Authorized" }
            };
            
            var user = await _context.Users.FindAsync(GetCurrentUserId());
            var referralFromDatabase =  await _context.Referrals
            .Where(referralDb => (referralDb.User == user) && (referralDb.Id == referral.Id))
            .FirstOrDefaultAsync();

            if (user.Tier < 2 || user.Id != referralFromDatabase.Id|| referralFromDatabase.IsPaid)
            {
                return Unauthorized(response);
            }

             _context.Entry(referral).State = EntityState.Modified;

             try
            {

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!ReferralExists(referral.Id))
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
            return Ok();
        }
        
        private bool ReferralExists(int id)
        {
            return _context.Referrals.Any(referral => referral.Id == id);
        }

         private int GetCurrentUserId()
        {
            // Get the User Id from the claim and then parse it as an integer.
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }
    }
}