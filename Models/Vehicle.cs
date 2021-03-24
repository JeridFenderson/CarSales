using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace CarSales.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Vehicle_Id 
        { 
            get
            {
                return Vin;
            } 
        }
        public string Title { 
            get
            {
                return Trim != "" ? $"{Year} {Make} {Model} {Trim}" :  $"{Year} {Make} {Model}";
            }
        }
        public string Price { 
            get
            {
                return $"{String.Format("{0:0.00}", ListPrice)} USD";
            }
        }
        public string LotSpot { get; set; }
        public string Vin { get; set; }
        public int Year { get; set; }
        public string Make { get; set; }
        public string Model { get; set; } 
        public string Trim { get; set; }
        public string Exterior_Color { get; set; }
        public string Interior_Color { get; set; }
        public float EngineDisplacement { get; set; }
        public string Body_Style { get; set; }
        public int Seats {get; set;}
        public string Transmission { get; set; }
        public string Drivetrain { get; set; }  
        public string Fuel_Type { get; set; }
        public string Vehicle_Type { get; set; }
        public string Condition { get; set; }
        public string State_Of_Vehicle { get; set; }
        public string Description { get; set; }
        public List<Feature> Features {get; set;}
        public int MileageId { get; set; }
        public Mileage Mileage { get; set; }
        public List<Media> Images { get; set; }  
        public string Status { get; set; }
        public double SearchPrice { get; set; }
        public double OfferCost { get; set; }
        public double PurchaseCost { get; set; }
        public double ListPrice { get; set; }
        public double SalePrice { get; set; }

        [NotMapped]
        public int PurchaserId { get; set; }
        public User Purchaser { get; set; }

        [NotMapped]
        public int BuyerId { get; set; }
        public User Buyer { get; set; } 

        public bool IsReferral {get; set; }
        [NotMapped]
        public int ReferrerId { get; set; }
        public User Referrer { get; set; }
        public double PaymentAmountDue 
        {
            get
            {
                return PaymentAmountDue;
            }
            private set
            {
                PaymentAmountDue = (SalePrice * 0.05);
            }
        }
        public bool ReferralIsCredit { get; set; }
        public bool ReferralIsPaid { get; set; } 
        public string Date_First_On_Lot { get; set; }
        public string Date_Sold { get; set; }
        public string Available 
        { 
            get
            {
                return Status == "SOLD" ? "not available" : "available";  
            } 
        }
        public List<Maintenance> Maintenance {get; set;}
        public double MaintenanceCost { 
            get
            {
                return Maintenance.Aggregate(0.00, (currentTotal, maintenance) => currentTotal + maintenance.Cost);
            }
        }
        public double MarginAmount {
            get
            {
                return SalePrice - PurchaseCost - MaintenanceCost;
            }
        }
        public double MarginPercentage{
            get
            {
                return MarginAmount / (PurchaseCost + MaintenanceCost);
            }
        }
        public double MarginAmountWithReferral {
            get
            {
                return SalePrice * 1.05 - PurchaseCost - MaintenanceCost;
            }
        }
        public double MarginPercentageWithReferral{
            get
            {
                return MarginAmountWithReferral / (PurchaseCost + MaintenanceCost);
            }
        }

        //Internal Id
        public int DealerId { get; set; }
        public int Fb_Page_Id { get; set; }

        //External Id
        public string Dealer_Id { get; set; }
        public string Dealer_Name { get; set; }
        public string Dealer_Phone { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Url { get; set; }     
        public DateTime CreationDate { get; private set; } = DateTime.Now;   
    }
}