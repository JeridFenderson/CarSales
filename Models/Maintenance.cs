namespace CarSales.Models
{
    public class Maintenance
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public string Task { get; set; }
        public string Description { get; set; }
        public double Cost { get; set; }
    }
}