using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CarSales.Models
{
    public class Vehicle
    {
        public int Id { get; set; }

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
        public string VIN { get; set; }
        
        [Required]
        public string Exterior_Color { get; set; }

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


        [Required]
        public int Fb_Page_Id { get; set; }

        [Required]
        public string Dealer_Id { get; set; }
        
        [Required]
        public string Dealer_Name { get; set; }
        
        [Required]
        public string Dealer_Phone { get; set; }
        
        [Required]  
        public int AddressId { get; set; }    
        public Address Address {get; set;}

        [Required]
        public float Latitude { get; set; }
        [Required]
        public float Longitude { get; set; }

        [Required]
        public string Url { get; set; }

        public string Tag { get; set; }
        [Required]
        public List<Media> Images { get; set; }       


        public bool IsListed { get; set; }
        public bool IsSold { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }     
    }
}