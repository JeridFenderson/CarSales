// using System.Collections.Generic;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Configuration;
// using CarSales.Models;
// using CarSales.Utils;
// using System;
// using MimeKit;
// using System.Net.Mail;
// using MimeKit.Text;
// using MailKit.Security;

// namespace CarSales.Controllers
// {
//     public class ContactUser
//     {
//         public string FirstName { get; set; }
//         public string LastName { get; set; }
//         public string Email { get; set; }
//         public string PhoneNumber { get; set; }
//         public string Question { get; set; }
        
        
//     }
//     // All of these routes will be at the base URL:     /api/Sessions
//     // That is what "api/[controller]" means below. It uses the name of the controller
//     // in this case RestaurantsController to determine the URL
//     [Route("api/[controller]")]
//     [ApiController]
//     public class ContactController : ControllerBase
//     {
//         [HttpPost]
//         public static void Email (ContactUser contactUser)
//         {
//            // create email message
//             var email = new MimeMessage();
//             email.From.Add(MailboxAddress.Parse($"{contactUser.Email}"));
//             email.To.Add(MailboxAddress.Parse("jrfenderson@gmail.com"));
//             email.Subject = "Test Email Subject";
//             email.Body = new TextPart(TextFormat.Plain) { Text = $"{contactUser.Question}" };

//             // send email
//             using var smtp = new SmtpClient();
//             smtp.Connect("smtp.ethereal.email", 587, SecureSocketOptions.StartTls);
//             smtp.Authenticate("[USERNAME]", "[PASSWORD]");
//             smtp.Send(email);
//             smtp.Disconnect(true);
//         }
//     }
// }