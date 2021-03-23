using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarSales.Models
{
    public class Referral
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
        public double VehicleSalePrice {get; set;}
        public double PaymentAmountDue 
        {
            get
            {
                return PaymentAmountDue;
            }
            private set
            {
                PaymentAmountDue = (VehicleSalePrice * 0.05);
            }
        }
        public bool IsCredit{ get; set; }

        [ForeignKey("ReferredUser")]
        public int ReferredUserId { get; set; }
        public User ReferredUser { get; set; }

        [ForeignKey("RefferalFrom")]
        public int ReferralFromId { get; set; }
        public User ReferralFrom { get; set; }
        public bool IsPaid { get; set; }  
        public DateTime CreationDate { get; private set;} = DateTime.Now;     
    }
}