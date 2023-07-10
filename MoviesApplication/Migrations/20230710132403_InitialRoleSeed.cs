using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoviesApplication.Migrations
{
    public partial class InitialRoleSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "37995281-adfe-4a57-a8f0-b7052e3bb0dd", "0e2ac37f-0a23-44b5-a8d5-2220d4a8b317", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "6bf7464d-77e7-4c41-9d1c-7c8d71a80f40", "47e976fb-69be-45ed-8969-d67769f84727", "Viewer", "VIEWER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "37995281-adfe-4a57-a8f0-b7052e3bb0dd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6bf7464d-77e7-4c41-9d1c-7c8d71a80f40");
        }
    }
}
