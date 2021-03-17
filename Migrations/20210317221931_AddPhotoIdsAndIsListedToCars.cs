using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarSales.Migrations
{
    public partial class AddPhotoIdsAndIsListedToCars : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsListed",
                table: "Vehicles",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<List<string>>(
                name: "PhotoIds",
                table: "Vehicles",
                type: "text[]",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsListed",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "PhotoIds",
                table: "Vehicles");
        }
    }
}
