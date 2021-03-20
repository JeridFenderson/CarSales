using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarSales.Migrations
{
    public partial class CleanedUpRelationships : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DealerId",
                table: "Media",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<List<int>>(
                name: "MediaId",
                table: "Dealers",
                type: "integer[]",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Media_DealerId",
                table: "Media",
                column: "DealerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Dealers_DealerId",
                table: "Media",
                column: "DealerId",
                principalTable: "Dealers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Media_Dealers_DealerId",
                table: "Media");

            migrationBuilder.DropIndex(
                name: "IX_Media_DealerId",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "DealerId",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "MediaId",
                table: "Dealers");
        }
    }
}
