using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarSales.Models
{
    public class Address
    {
        public  int Id  { get; set; }
        public int Fb_page_id { get; set; }
        public string Dealer_id { get; set; }
        public string Dealer_name { get; set; }
        public string Dealer_phone { get; set; }   
        public string Addr1 { get; set; }
        public string City { get; set; }
        public string Region {get;set;}
        public string Country { get; set; }
        public string Postal_code { get; set; }   
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Url { get; set; }

        [NotMapped]
        public int ManagerId { get; set; }
        [NotMapped]
        public User Manager { get; set; }
        public List<Media> Media { get; set; }
        public List<Vehicle> Vehicles { get; set; }
        public List<User> Users { get; set; }
        public DateTime DateOfEntryCreation { get; private set; } = DateTime.Now; 
    }
}