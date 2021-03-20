using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarSales.Models
{
    public class Referral
    {
        public int Id { get; set; }
        public int VehicleId {get; set;}
        public double VehicleSalePrice {get; set;}
        public double PaymentAmountDue 
        {
            get
            {
                return PaymentAmountDue;
            }
            set
            {
                PaymentAmountDue = (VehicleSalePrice * 0.05);
            }
        }

        [NotMapped]
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        
        [NotMapped]
        public int FromId { get; set; }
        public string FromFirstName { get; set; }
        public bool IsPaid { get; set; }  
        public DateTime DateOfEntryCreation { get; } = DateTime.Now;      
    }
}