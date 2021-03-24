using System.ComponentModel.DataAnnotations;

namespace CarSales.Models
{
    public class Mileage
    { 
        public int Id { get; set; }
        
        [Required]
        public int Value { get; set; }   
        public string Unit { get; set; }
    }
}