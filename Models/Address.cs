using System.ComponentModel.DataAnnotations;

namespace CarSales.Models
{
    public class Address
    {
        public int Id { get; set; }

        [Required]
        public string Addr1 { get; set; }
        
        [Required]
        public string City { get; set; }
        
        [Required]
        public string Region {get;set;}
        
        [Required]
        public string Country { get; set; }
        
        [Required]
        public string Postal_Code { get; set; }   
    }
}