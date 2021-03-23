using Microsoft.EntityFrameworkCore.Migrations;

namespace CarSales.Migrations
{
    public partial class SlimmedDownDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Media_Dealers_DealerId",
                table: "Media");

            migrationBuilder.DropForeignKey(
                name: "FK_Media_Users_UserId",
                table: "Media");

            migrationBuilder.DropForeignKey(
                name: "FK_Media_Vehicles_VehicleId",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "InternalDescription",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "InternalListOrder",
                table: "Media");

            migrationBuilder.AddColumn<int>(
                name: "DealerId",
                table: "Vehicles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "VehicleId",
                table: "Media",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Media",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "DealerId",
                table: "Media",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_DealerId",
                table: "Vehicles",
                column: "DealerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Dealers_DealerId",
                table: "Media",
                column: "DealerId",
                principalTable: "Dealers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Users_UserId",
                table: "Media",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Vehicles_VehicleId",
                table: "Media",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Dealers_DealerId",
                table: "Vehicles",
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

            migrationBuilder.DropForeignKey(
                name: "FK_Media_Users_UserId",
                table: "Media");

            migrationBuilder.DropForeignKey(
                name: "FK_Media_Vehicles_VehicleId",
                table: "Media");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Dealers_DealerId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_DealerId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "DealerId",
                table: "Vehicles");

            migrationBuilder.AlterColumn<int>(
                name: "VehicleId",
                table: "Media",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Media",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DealerId",
                table: "Media",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InternalDescription",
                table: "Media",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InternalListOrder",
                table: "Media",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Dealers_DealerId",
                table: "Media",
                column: "DealerId",
                principalTable: "Dealers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Users_UserId",
                table: "Media",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Vehicles_VehicleId",
                table: "Media",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
