using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CarSales.Models
{
    public class Dealer
    {
        public  int Id  { get; set; }
        public Media BackgroundImage {get; set;}
        public string VisionStatement { get; set; }
        public List<string> VisionStatementParagraphs { get; set; } 
        public string MissionStatement { get; set; }
        public List<string> MissionStatementParagraphs { get; set; }


        public int Fb_Page_Id { get; set; }
        public string Dealer_Id { get; set; }
        public string Dealer_Name { get; set; }
        public string Dealer_Phone { get; set; }   
        public int AddressId { get; set; } 
        public Address Address {get; set;}
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Url { get; set; }
    }
}