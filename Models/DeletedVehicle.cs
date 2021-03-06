using System;

namespace CarSales.Models
{
    public class DeletedVehicle
    {
        public int Id { get; set; }
        public int DeleterId { get; set; }
        public string VehicleInfo { get; set; }
        public string MonetaryInfo { get; set; }
        public DateTime CreationDate { get; private set;} = DateTime.Now; 
    }
}