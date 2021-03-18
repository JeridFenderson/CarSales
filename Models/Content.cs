using System.Collections.Generic;

namespace CarSales.Models
{
    public class Content
    {
        public  int Id  { get; set; }
        public Media BackgroundImage {get; set;}
        public string VisionStatement { get; set; }
        public List<string> VisionStatementParagraphs { get; set; } 
        public string MissionStatement { get; set; }
        public List<string> MissionStatementParagraphs { get; set; }
    }
}