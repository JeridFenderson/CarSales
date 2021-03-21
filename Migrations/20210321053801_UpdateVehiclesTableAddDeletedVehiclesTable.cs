using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace CarSales.Migrations
{
    public partial class UpdateVehiclesTableAddDeletedVehiclesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCpo",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "IsListed",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "IsSearchRequest",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "IsSold",
                table: "Vehicles");

            migrationBuilder.AlterColumn<string>(
                name: "Vehicle_Type",
                table: "Vehicles",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Vehicles",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<double>(
                name: "OfferCost",
                table: "Vehicles",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SearchPrice",
                table: "Vehicles",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "State_Of_Vehicle",
                table: "Vehicles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Vehicles",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DeletedVehicles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    VehicleInfo = table.Column<string>(type: "text", nullable: true),
                    MonetaryInfo = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeletedVehicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeletedVehicles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeletedVehicles_UserId",
                table: "DeletedVehicles",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeletedVehicles");

            migrationBuilder.DropColumn(
                name: "OfferCost",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "SearchPrice",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "State_Of_Vehicle",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Vehicles");

            migrationBuilder.AlterColumn<string>(
                name: "Vehicle_Type",
                table: "Vehicles",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Vehicles",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCpo",
                table: "Vehicles",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsListed",
                table: "Vehicles",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSearchRequest",
                table: "Vehicles",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSold",
                table: "Vehicles",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
