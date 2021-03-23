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

        [Required]
        public string Vin { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public string Make { get; set; }
        [Required]
        public string Model { get; set; } 
        public string Trim { get; set; }
        [Required]
        public string Exterior_Color { get; set; }
        public string Interior_Color { get; set; }
        [Required]
        public float EngineDisplacement { get; set; }
        public string Body_Style { get; set; }
        [Required]
        public int Seats {get; set;}
        [Required]
        public string Transmission { get; set; }
        [Required]
        public string Drivetrain { get; set; }  
        [Required]
        public string Fuel_Type { get; set; }
        [Required]
        public string Vehicle_Type { get; set; }
        [Required]
        public string Condition { get; set; }
        [Required]
        public string State_Of_Vehicle { get; set; }
        [Required]
        public string Description { get; set; }
        public List<Feature> Features {get; set;}
        public int MileageId { get; set; }
        [Required]
        public Mileage Mileage { get; set; }
        public List<int> ImagesId { get; set; }
        public List<Media> Images { get; set; }  
        public string Status { get; set; }
        public double SearchPrice { get; set; }
        public double OfferCost { get; set; }
        public double PurchaseCost { get; set; }
        public double ListPrice { get; set; }
        public double SalePrice { get; set; }
        public bool IsReferral {get; set; }
        public int ReferredUserId { get; set; }
        public Referral ReferredUser { get; set; }
        public int ReferralFromId { get; set; }
        public Referral ReferralFrom { get; set; }
        public string Date_First_On_Lot { get; set; }
        public string Date_Sold { get; set; }
        public string Available 
        { 
            get
            {
                return Status == "SOLD" ? "not available" : "available";  
            } 
        }
        public List<int> MaintenanceId { get; set; }
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
        public int PurchaserId { get; set; }
        public User Purchaser { get; set; }
        public int BuyerId { get; set; }
        public User Buyer { get; set; } 
        public int Fb_Page_Id { get; set; }
        public string Dealer_Id { get; set; }
        public string Dealer_Name { get; set; }
        public string Dealer_Phone { get; set; }
        public Address Address {get; set;}
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Url { get; set; }     
        public DateTime CreationDate { get; private set; } = DateTime.Now;   
    }
}