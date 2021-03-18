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

        [Required]
        public int Odometer { get; set; }
        public string VIN { get; set; }
        public string FuelType { get; set; }
        public string Drivetrain { get; set; }
        public string BodyType { get; set; }
        public string ExteriorColor { get; set; }
        public string InteriorColor { get; set; }
        public string EngineSize { get; set; }
        public string Description { get; set; }
        public bool IsListed { get; set; }
        public bool IsSold { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        //  [Required]
        public List<Media> Photos { get; set; }  
                
    }
}