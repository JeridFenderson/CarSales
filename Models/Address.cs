using System.ComponentModel.DataAnnotations;

namespace CarSales.Models
{
    public class Address
    {
        public int Id { get; set; }
        public int DealerId { get; set; }
        public string Addr1 { get; set; }
        public string City { get; set; }
        public string Region {get;set;}
        public string Country { get; set; }
        public string Postal_Code { get; set; }   
    }
}