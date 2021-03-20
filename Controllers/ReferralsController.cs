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
            var currentUser = await _context.Users.FindAsync(GetCurrentUserId());
            if (!currentUser.IsAdmin)
            {
                // Return our error with the custom response
                return Unauthorized(response);
            }
            // Uses the database context in `_context` to request all of the Media, sort
            // them by row id and return them as a JSON array.
            return await _context.Referrals
            .Where(referral => referral.IsPaid == false)
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
            var currentUser = await _context.Users.FindAsync(GetCurrentUserId());
            if (!currentUser.IsOwner)
            {
                // Return our error with the custom response
                return Unauthorized(response);
            }
            // Uses the database context in `_context` to request all of the Media, sort
            // them by row id and return them as a JSON array.
            return await _context.Referrals.ToListAsync();
        }

         private int GetCurrentUserId()
        {
            // Get the User Id from the claim and then parse it as an integer.
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }
    }
}