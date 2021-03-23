using Microsoft.EntityFrameworkCore.Migrations;

namespace CarSales.Migrations
{
    public partial class MoreFatSlimming : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Referrals_Vehicles_VehicleId",
                table: "Referrals");

            migrationBuilder.DropIndex(
                name: "IX_Referrals_VehicleId",
                table: "Referrals");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Referrals_VehicleId",
                table: "Referrals",
                column: "VehicleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Referrals_Vehicles_VehicleId",
                table: "Referrals",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
