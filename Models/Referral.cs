using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarSales.Models
{
    public class Referral
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
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
        public int UserId { get; set; }
        public User User { get; set; }
        public int FromId { get; set; }
        public bool IsPaid { get; set; }  
        public DateTime CreationDate { get; private set;} = DateTime.Now;     
    }
}