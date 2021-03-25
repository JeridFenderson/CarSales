using Microsoft.EntityFrameworkCore.Migrations;

namespace CarSales.Migrations
{
    public partial class MoreFatTrimming : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Users_BuyerId1",
                table: "Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Users_PurchaserId1",
                table: "Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Users_ReferrerId1",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_BuyerId1",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_PurchaserId1",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_ReferrerId1",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "BuyerId1",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "DealerId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "Dealer_Id",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "Dealer_Name",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "Dealer_Phone",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "Fb_Page_Id",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "PaymentAmountDue",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "PurchaserId1",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "ReferrerId1",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Vehicles");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BuyerId1",
                table: "Vehicles",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DealerId",
                table: "Vehicles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Dealer_Id",
                table: "Vehicles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Dealer_Name",
                table: "Vehicles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Dealer_Phone",
                table: "Vehicles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Vehicles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Fb_Page_Id",
                table: "Vehicles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "Latitude",
                table: "Vehicles",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Longitude",
                table: "Vehicles",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<double>(
                name: "PaymentAmountDue",
                table: "Vehicles",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "PurchaserId1",
                table: "Vehicles",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReferrerId1",
                table: "Vehicles",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Vehicles",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_BuyerId1",
                table: "Vehicles",
                column: "BuyerId1");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_PurchaserId1",
                table: "Vehicles",
                column: "PurchaserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_ReferrerId1",
                table: "Vehicles",
                column: "ReferrerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Users_BuyerId1",
                table: "Vehicles",
                column: "BuyerId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Users_PurchaserId1",
                table: "Vehicles",
                column: "PurchaserId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Users_ReferrerId1",
                table: "Vehicles",
                column: "ReferrerId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
