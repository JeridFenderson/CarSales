using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarSales.Models
{
    public class Dealer
    {
        public  int Id  { get; set; }
        public int Fb_Page_Id { get; set; }
        public string Dealer_Id { get; set; }
        public string Dealer_Name { get; set; }
        public string Dealer_Phone { get; set; }   
        public string Addr1 { get; set; }
        public string City { get; set; }
        public string Region {get;set;}
        public string Country { get; set; }
        public string Postal_Code { get; set; }   
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Url { get; set; }
        public List<Media> Media { get; set; }
        public int ManagerId { get; set; }
        public User Manager { get; set; }
        public List<User> Admins { get; set; }
        public List<User> Users { get; set; }
        public DateTime DateOfEntryCreation { get; private set; } = DateTime.Now; 
    }
}