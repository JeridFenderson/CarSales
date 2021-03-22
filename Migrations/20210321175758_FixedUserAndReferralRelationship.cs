using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarSales.Migrations
{
    public partial class FixedUserAndReferralRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Referrals_Users_UserId1",
                table: "Referrals");

            migrationBuilder.DropForeignKey(
                name: "FK_Referrals_Users_UserId2",
                table: "Referrals");

            migrationBuilder.DropIndex(
                name: "IX_Referrals_UserId1",
                table: "Referrals");

            migrationBuilder.DropIndex(
                name: "IX_Referrals_UserId2",
                table: "Referrals");

            migrationBuilder.DropColumn(
                name: "FromId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Referrals");

            migrationBuilder.DropColumn(
                name: "UserId2",
                table: "Referrals");

            migrationBuilder.RenameColumn(
                name: "ReferredById",
                table: "Users",
                newName: "ReferralsId");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Referrals",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Referrals_UserId",
                table: "Referrals",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Referrals_Users_UserId",
                table: "Referrals",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Referrals_Users_UserId",
                table: "Referrals");

            migrationBuilder.DropIndex(
                name: "IX_Referrals_UserId",
                table: "Referrals");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Referrals");

            migrationBuilder.RenameColumn(
                name: "ReferralsId",
                table: "Users",
                newName: "ReferredById");

            migrationBuilder.AddColumn<int[]>(
                name: "FromId",
                table: "Users",
                type: "integer[]",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "Referrals",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId2",
                table: "Referrals",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Referrals_UserId1",
                table: "Referrals",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Referrals_UserId2",
                table: "Referrals",
                column: "UserId2");

            migrationBuilder.AddForeignKey(
                name: "FK_Referrals_Users_UserId1",
                table: "Referrals",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Referrals_Users_UserId2",
                table: "Referrals",
                column: "UserId2",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
