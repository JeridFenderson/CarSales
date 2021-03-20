using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        [Required]
        public int Year { get; set; }
        [Required]
        public string Make { get; set; }
        [Required]
        public string Model { get; set; }
        public string Price { 
            get
            {
                return $"{String.Format("{0:0.00}", ListPrice)} USD";
            }
        }
        public int MileageId { get; set; }
        public Mileage Mileage { get; set; }

        [Required]
        public string Vin { get; set; }
        public string State_Of_Vehicle {
            get
            {
                return IsCpo ? "CPO" : "Used";
            }
        }
        
        [Required]
        public string Exterior_Color { get; set; }
        public string Interior_Color { get; set; }

        [Required]
        public string Body_Style { get; set; }

        [Required]
        public string Transmission { get; set; }

        [Required]
        public string Drivetrain { get; set; }
        
        [Required]
        public string Fuel_Type { get; set; }
        
        [Required]
        public string Description { get; set; }
        public string Vehicle_Type { get; set; }
        public string Trim { get; set; }
        public string Condition { get; set; }
        public List<string> Features {get; set;}
        public bool IsSearchRequest { get; set; }
        public double PurchaseCost {get; set;}
        public bool IsListed {get; set;}
        public double ListPrice {get; set;}
        public bool IsSold { get; set; }
        public bool IsReferral {get; set; }
        public double SalePrice { get; set; }
        public string Date_First_On_Lot { get; set; }
        public bool IsCpo { get; set; }
        public List<int> MaintenanceId { get; set; }
        public List<Maintenance> Maintenance {get; set;}
        public double MaintenanceCost { 
            get
            {
                return Maintenance.Aggregate(0.00, (currentTotal, maintenance) => currentTotal + maintenance.Cost);
            }
        }
        public string Date_Sold { get; set; }

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
        public string Available 
        { 
            get
            {
                return IsSold ? "not available" : "available";  
            } 
        }
       
        public List<int> ImagesId { get; set; }
        public List<Media> Images { get; set; }  


        public int UserId { get; set; }
        public User User { get; set; }  
        public int Fb_Page_Id { get; set; }
        public string Dealer_Id { get; set; }
        public string Dealer_Name { get; set; }
        public string Dealer_Phone { get; set; }
        public int AddressId { get; set; }    
        public Address Address {get; set;}
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Url { get; set; }     
        public DateTime DateOfEntryCreation { get; } = DateTime.Now;  
    }
}