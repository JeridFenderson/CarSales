using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarSales.Migrations
{
    public partial class MajorUpdateToORMs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Media_Dealers_DealerId",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "ReferralsId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MediaId",
                table: "Dealers");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Vehicles",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Users",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Referrals",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<int>(
                name: "DealerId",
                table: "Media",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "DeletedVehicles",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Dealers_DealerId",
                table: "Media",
                column: "DealerId",
                principalTable: "Dealers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Media_Dealers_DealerId",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Referrals");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "DeletedVehicles");

            migrationBuilder.AddColumn<int[]>(
                name: "ReferralsId",
                table: "Users",
                type: "integer[]",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DealerId",
                table: "Media",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int[]>(
                name: "MediaId",
                table: "Dealers",
                type: "integer[]",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Dealers_DealerId",
                table: "Media",
                column: "DealerId",
                principalTable: "Dealers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
