using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace CarSales.Migrations
{
    public partial class AddedManager : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Fb_Page_Id = table.Column<int>(type: "integer", nullable: false),
                    Dealer_Id = table.Column<string>(type: "text", nullable: true),
                    Dealer_Name = table.Column<string>(type: "text", nullable: true),
                    Dealer_Phone = table.Column<string>(type: "text", nullable: true),
                    Addr1 = table.Column<string>(type: "text", nullable: true),
                    City = table.Column<string>(type: "text", nullable: true),
                    Region = table.Column<string>(type: "text", nullable: true),
                    Country = table.Column<string>(type: "text", nullable: true),
                    Postal_Code = table.Column<string>(type: "text", nullable: true),
                    Latitude = table.Column<float>(type: "real", nullable: false),
                    Longitude = table.Column<float>(type: "real", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    DateOfEntryCreation = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DeletedVehicles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DeleterId = table.Column<int>(type: "integer", nullable: false),
                    VehicleInfo = table.Column<string>(type: "text", nullable: true),
                    MonetaryInfo = table.Column<string>(type: "text", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeletedVehicles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Mileage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Value = table.Column<int>(type: "integer", nullable: false),
                    Unit = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mileage", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    HashedPassword = table.Column<string>(type: "text", nullable: true),
                    Tier = table.Column<int>(type: "integer", nullable: false),
                    AddressId = table.Column<int>(type: "integer", nullable: false),
                    LastActive = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LotSpot = table.Column<string>(type: "text", nullable: true),
                    Vin = table.Column<string>(type: "text", nullable: true),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    Make = table.Column<string>(type: "text", nullable: true),
                    Model = table.Column<string>(type: "text", nullable: true),
                    Trim = table.Column<string>(type: "text", nullable: true),
                    Exterior_Color = table.Column<string>(type: "text", nullable: true),
                    Interior_Color = table.Column<string>(type: "text", nullable: true),
                    EngineDisplacement = table.Column<float>(type: "real", nullable: false),
                    Body_Style = table.Column<string>(type: "text", nullable: true),
                    Seats = table.Column<int>(type: "integer", nullable: false),
                    Transmission = table.Column<string>(type: "text", nullable: true),
                    Drivetrain = table.Column<string>(type: "text", nullable: true),
                    Fuel_Type = table.Column<string>(type: "text", nullable: true),
                    Vehicle_Type = table.Column<string>(type: "text", nullable: true),
                    Condition = table.Column<string>(type: "text", nullable: true),
                    State_Of_Vehicle = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    MileageId = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: true),
                    SearchPrice = table.Column<double>(type: "double precision", nullable: false),
                    OfferCost = table.Column<double>(type: "double precision", nullable: false),
                    PurchaseCost = table.Column<double>(type: "double precision", nullable: false),
                    ListPrice = table.Column<double>(type: "double precision", nullable: false),
                    SalePrice = table.Column<double>(type: "double precision", nullable: false),
                    PurchaserId1 = table.Column<int>(type: "integer", nullable: true),
                    BuyerId1 = table.Column<int>(type: "integer", nullable: true),
                    IsReferral = table.Column<bool>(type: "boolean", nullable: false),
                    ReferrerId1 = table.Column<int>(type: "integer", nullable: true),
                    PaymentAmountDue = table.Column<double>(type: "double precision", nullable: false),
                    ReferralIsCredit = table.Column<bool>(type: "boolean", nullable: false),
                    ReferralIsPaid = table.Column<bool>(type: "boolean", nullable: false),
                    Date_First_On_Lot = table.Column<string>(type: "text", nullable: true),
                    Date_Sold = table.Column<string>(type: "text", nullable: true),
                    DealerId = table.Column<int>(type: "integer", nullable: false),
                    Fb_Page_Id = table.Column<int>(type: "integer", nullable: false),
                    Dealer_Id = table.Column<string>(type: "text", nullable: true),
                    Dealer_Name = table.Column<string>(type: "text", nullable: true),
                    Dealer_Phone = table.Column<string>(type: "text", nullable: true),
                    AddressId = table.Column<int>(type: "integer", nullable: false),
                    Latitude = table.Column<float>(type: "real", nullable: false),
                    Longitude = table.Column<float>(type: "real", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vehicles_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Vehicles_Mileage_MileageId",
                        column: x => x.MileageId,
                        principalTable: "Mileage",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Vehicles_Users_BuyerId1",
                        column: x => x.BuyerId1,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Vehicles_Users_PurchaserId1",
                        column: x => x.PurchaserId1,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Vehicles_Users_ReferrerId1",
                        column: x => x.ReferrerId1,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Features",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Value = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<string>(type: "text", nullable: true),
                    VehicleId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Features", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Features_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Maintenance",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Task = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Cost = table.Column<double>(type: "double precision", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    VehicleId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maintenance", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Maintenance_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Media",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PublicId = table.Column<string>(type: "text", nullable: true),
                    Signature = table.Column<string>(type: "text", nullable: true),
                    Format = table.Column<string>(type: "text", nullable: true),
                    ResourceType = table.Column<string>(type: "text", nullable: true),
                    Bytes = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: true),
                    Url = table.Column<string>(type: "text", nullable: true),
                    SecureUrl = table.Column<string>(type: "text", nullable: true),
                    AddressId = table.Column<int>(type: "integer", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    VehicleId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Media", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Media_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Media_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Media_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Features_VehicleId",
                table: "Features",
                column: "VehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_Maintenance_VehicleId",
                table: "Maintenance",
                column: "VehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_Media_AddressId",
                table: "Media",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Media_UserId",
                table: "Media",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Media_VehicleId",
                table: "Media",
                column: "VehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_AddressId",
                table: "Users",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_AddressId",
                table: "Vehicles",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_BuyerId1",
                table: "Vehicles",
                column: "BuyerId1");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_MileageId",
                table: "Vehicles",
                column: "MileageId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_PurchaserId1",
                table: "Vehicles",
                column: "PurchaserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_ReferrerId1",
                table: "Vehicles",
                column: "ReferrerId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeletedVehicles");

            migrationBuilder.DropTable(
                name: "Features");

            migrationBuilder.DropTable(
                name: "Maintenance");

            migrationBuilder.DropTable(
                name: "Media");

            migrationBuilder.DropTable(
                name: "Vehicles");

            migrationBuilder.DropTable(
                name: "Mileage");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Addresses");
        }
    }
}
