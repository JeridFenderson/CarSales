using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace CarSales.Migrations
{
    public partial class ModifiedTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "PriceSoldAt",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Vehicles");

            migrationBuilder.RenameColumn(
                name: "Vehicle_Id",
                table: "Vehicles",
                newName: "Vehicle_Type");

            migrationBuilder.AddColumn<List<int>>(
                name: "ImagesId",
                table: "Vehicles",
                type: "integer[]",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCpo",
                table: "Vehicles",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsReferral",
                table: "Vehicles",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "ListPrice",
                table: "Vehicles",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<List<int>>(
                name: "MaintenanceId",
                table: "Vehicles",
                type: "integer[]",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "PurchaseCost",
                table: "Vehicles",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SalePrice",
                table: "Vehicles",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<double>(
                name: "VehicleSalePrice",
                table: "Referrals",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateTable(
                name: "Maintenance",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    VehicleId = table.Column<int>(type: "integer", nullable: false),
                    Task = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Cost = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maintenance", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Maintenance_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Maintenance_VehicleId",
                table: "Maintenance",
                column: "VehicleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Maintenance");

            migrationBuilder.DropColumn(
                name: "ImagesId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "IsCpo",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "IsReferral",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "ListPrice",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "MaintenanceId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "PurchaseCost",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "SalePrice",
                table: "Vehicles");

            migrationBuilder.RenameColumn(
                name: "Vehicle_Type",
                table: "Vehicles",
                newName: "Vehicle_Id");

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Vehicles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PriceSoldAt",
                table: "Vehicles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Vehicles",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "VehicleSalePrice",
                table: "Referrals",
                type: "integer",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");
        }
    }
}
