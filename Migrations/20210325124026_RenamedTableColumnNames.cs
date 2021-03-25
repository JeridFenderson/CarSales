using Microsoft.EntityFrameworkCore.Migrations;

namespace CarSales.Migrations
{
    public partial class RenamedTableColumnNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Vehicle_Type",
                table: "Vehicles",
                newName: "Vehicle_type");

            migrationBuilder.RenameColumn(
                name: "State_Of_Vehicle",
                table: "Vehicles",
                newName: "State_of_vehicle");

            migrationBuilder.RenameColumn(
                name: "Interior_Color",
                table: "Vehicles",
                newName: "Interior_color");

            migrationBuilder.RenameColumn(
                name: "Fuel_Type",
                table: "Vehicles",
                newName: "Fuel_type");

            migrationBuilder.RenameColumn(
                name: "Exterior_Color",
                table: "Vehicles",
                newName: "Exterior_color");

            migrationBuilder.RenameColumn(
                name: "Date_Sold",
                table: "Vehicles",
                newName: "Date_sold");

            migrationBuilder.RenameColumn(
                name: "Date_First_On_Lot",
                table: "Vehicles",
                newName: "Date_first_on_lot");

            migrationBuilder.RenameColumn(
                name: "Body_Style",
                table: "Vehicles",
                newName: "Body_style");

            migrationBuilder.RenameColumn(
                name: "Postal_Code",
                table: "Addresses",
                newName: "Postal_code");

            migrationBuilder.RenameColumn(
                name: "Fb_Page_Id",
                table: "Addresses",
                newName: "Fb_page_id");

            migrationBuilder.RenameColumn(
                name: "Dealer_Phone",
                table: "Addresses",
                newName: "Dealer_phone");

            migrationBuilder.RenameColumn(
                name: "Dealer_Name",
                table: "Addresses",
                newName: "Dealer_name");

            migrationBuilder.RenameColumn(
                name: "Dealer_Id",
                table: "Addresses",
                newName: "Dealer_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Vehicle_type",
                table: "Vehicles",
                newName: "Vehicle_Type");

            migrationBuilder.RenameColumn(
                name: "State_of_vehicle",
                table: "Vehicles",
                newName: "State_Of_Vehicle");

            migrationBuilder.RenameColumn(
                name: "Interior_color",
                table: "Vehicles",
                newName: "Interior_Color");

            migrationBuilder.RenameColumn(
                name: "Fuel_type",
                table: "Vehicles",
                newName: "Fuel_Type");

            migrationBuilder.RenameColumn(
                name: "Exterior_color",
                table: "Vehicles",
                newName: "Exterior_Color");

            migrationBuilder.RenameColumn(
                name: "Date_sold",
                table: "Vehicles",
                newName: "Date_Sold");

            migrationBuilder.RenameColumn(
                name: "Date_first_on_lot",
                table: "Vehicles",
                newName: "Date_First_On_Lot");

            migrationBuilder.RenameColumn(
                name: "Body_style",
                table: "Vehicles",
                newName: "Body_Style");

            migrationBuilder.RenameColumn(
                name: "Postal_code",
                table: "Addresses",
                newName: "Postal_Code");

            migrationBuilder.RenameColumn(
                name: "Fb_page_id",
                table: "Addresses",
                newName: "Fb_Page_Id");

            migrationBuilder.RenameColumn(
                name: "Dealer_phone",
                table: "Addresses",
                newName: "Dealer_Phone");

            migrationBuilder.RenameColumn(
                name: "Dealer_name",
                table: "Addresses",
                newName: "Dealer_Name");

            migrationBuilder.RenameColumn(
                name: "Dealer_id",
                table: "Addresses",
                newName: "Dealer_Id");
        }
    }
}
