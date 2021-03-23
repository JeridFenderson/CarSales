namespace CarSales.Models
{
    public class Media
    {
        public int Id { get; set; }
        public string PublicId { get; set; }
        public string Signature { get; set; }
        public string Format { get; set; }
        public string ResourceType { get; set; }
        public int Bytes { get; set; }
        public string Type { get; set; }
        public string Url { get; set; }
        public string SecureUrl { get; set; }  
    }
}