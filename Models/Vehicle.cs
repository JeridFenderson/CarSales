using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CarSales.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Vehicle_Id 
        { 
            get
            {
                return Vehicle_Id;
            } 
            set
            {
                Vehicle_Id = Vin;
            }
        }
         
        [Required]
        public int Year { get; set; }

        [Required]
        public string Make { get; set; }

        [Required]
        public string Model { get; set; }

        [Required]
        public int Price { get; set; }

    
        public int MileageId { get; set; }
        [Required]
        public Mileage Mileage { get; set; }


        [Required]
        public string Title { get; set; }
        
        [Required]
        public string Vin { get; set; }
        
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
        public string Trim { get; set; }
        public string Condition { get; set; }
        public List<string> Features {get; set;}
        public bool IsSearchRequest { get; set; }
        public bool IsListed {get; set;}
        public bool IsSold { get; set; }
        public string Date_First_On_Lot { 
            get
            {
                return Date_First_On_Lot;
            } 
            set
            {
                if(this.IsListed)
                {
                    this.Date_Sold= DateTime.Now.ToString("yyyy-mm-dd");
                }
            } 
        }
        public string Date_Sold {
            get
            {
                return Date_Sold;
            } 
            set
            {
                if(this.IsSold)
                {
                    this.Date_Sold = DateTime.Now.ToString("yyyy-mm-dd"); 
                }
            } 
        }
        public int PriceSoldAt { get; set; }
        public string Available 
        { 
            get
            {
                string Availability = IsSold ? "not available" : "available";
                return IsSold ? "not available" : "available";
            } 
        }
        public string Tag 
        { 
            get
            {
                return this.Year + " " + this.Make + " " + this.Model;
            }
        }
        [Required]
        public List<Media> Images { get; set; }    
        

        public int UserId { get; set; }
        public User User { get; set; }  


        //[Required]
        public int Fb_Page_Id { get; set; }

        //[Required]
        public string Dealer_Id { get; set; }
        
        //[Required]
        public string Dealer_Name { get; set; }
        
        //[Required]
        public string Dealer_Phone { get; set; }
        
        //[Required]  
        public int AddressId { get; set; }    
        public Address Address {get; set;}

        //[Required]
        public float Latitude { get; set; }
        //[Required]
        public float Longitude { get; set; }

        //[Required]
        public string Url { get; set; }     
        public DateTime DateOfEntryCreation { get; } = DateTime.Now;  
    }
}