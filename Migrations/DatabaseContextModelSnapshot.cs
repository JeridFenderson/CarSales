﻿// <auto-generated />
using System;
using CarSales.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace CarSales.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("CarSales.Models.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Addr1")
                        .HasColumnType("text");

                    b.Property<string>("City")
                        .HasColumnType("text");

                    b.Property<string>("Country")
                        .HasColumnType("text");

                    b.Property<DateTime>("DateOfEntryCreation")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Dealer_Id")
                        .HasColumnType("text");

                    b.Property<string>("Dealer_Name")
                        .HasColumnType("text");

                    b.Property<string>("Dealer_Phone")
                        .HasColumnType("text");

                    b.Property<int>("Fb_Page_Id")
                        .HasColumnType("integer");

                    b.Property<float>("Latitude")
                        .HasColumnType("real");

                    b.Property<float>("Longitude")
                        .HasColumnType("real");

                    b.Property<string>("Postal_Code")
                        .HasColumnType("text");

                    b.Property<string>("Region")
                        .HasColumnType("text");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("CarSales.Models.DeletedVehicle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("DeleterId")
                        .HasColumnType("integer");

                    b.Property<string>("MonetaryInfo")
                        .HasColumnType("text");

                    b.Property<string>("VehicleInfo")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("DeletedVehicles");
                });

            modelBuilder.Entity("CarSales.Models.Feature", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Type")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.Property<int?>("VehicleId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("VehicleId");

                    b.ToTable("Features");
                });

            modelBuilder.Entity("CarSales.Models.Maintenance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<double>("Cost")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Task")
                        .HasColumnType("text");

                    b.Property<int?>("VehicleId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("VehicleId");

                    b.ToTable("Maintenance");
                });

            modelBuilder.Entity("CarSales.Models.Media", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int?>("AddressId")
                        .HasColumnType("integer");

                    b.Property<int>("Bytes")
                        .HasColumnType("integer");

                    b.Property<string>("Format")
                        .HasColumnType("text");

                    b.Property<string>("PublicId")
                        .HasColumnType("text");

                    b.Property<string>("ResourceType")
                        .HasColumnType("text");

                    b.Property<string>("SecureUrl")
                        .HasColumnType("text");

                    b.Property<string>("Signature")
                        .HasColumnType("text");

                    b.Property<string>("Type")
                        .HasColumnType("text");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.Property<int?>("VehicleId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.HasIndex("UserId");

                    b.HasIndex("VehicleId");

                    b.ToTable("Media");
                });

            modelBuilder.Entity("CarSales.Models.Mileage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Unit")
                        .HasColumnType("text");

                    b.Property<int>("Value")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Mileage");
                });

            modelBuilder.Entity("CarSales.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("AddressId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("HashedPassword")
                        .HasColumnType("text");

                    b.Property<DateTime>("LastActive")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Tier")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CarSales.Models.Vehicle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("AddressId")
                        .HasColumnType("integer");

                    b.Property<string>("Body_Style")
                        .HasColumnType("text");

                    b.Property<int?>("BuyerId1")
                        .HasColumnType("integer");

                    b.Property<string>("Condition")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Date_First_On_Lot")
                        .HasColumnType("text");

                    b.Property<string>("Date_Sold")
                        .HasColumnType("text");

                    b.Property<int>("DealerId")
                        .HasColumnType("integer");

                    b.Property<string>("Dealer_Id")
                        .HasColumnType("text");

                    b.Property<string>("Dealer_Name")
                        .HasColumnType("text");

                    b.Property<string>("Dealer_Phone")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Drivetrain")
                        .HasColumnType("text");

                    b.Property<float>("EngineDisplacement")
                        .HasColumnType("real");

                    b.Property<string>("Exterior_Color")
                        .HasColumnType("text");

                    b.Property<int>("Fb_Page_Id")
                        .HasColumnType("integer");

                    b.Property<string>("Fuel_Type")
                        .HasColumnType("text");

                    b.Property<string>("Interior_Color")
                        .HasColumnType("text");

                    b.Property<bool>("IsReferral")
                        .HasColumnType("boolean");

                    b.Property<float>("Latitude")
                        .HasColumnType("real");

                    b.Property<double>("ListPrice")
                        .HasColumnType("double precision");

                    b.Property<float>("Longitude")
                        .HasColumnType("real");

                    b.Property<string>("LotSpot")
                        .HasColumnType("text");

                    b.Property<string>("Make")
                        .HasColumnType("text");

                    b.Property<int>("MileageId")
                        .HasColumnType("integer");

                    b.Property<string>("Model")
                        .HasColumnType("text");

                    b.Property<double>("OfferCost")
                        .HasColumnType("double precision");

                    b.Property<double>("PaymentAmountDue")
                        .HasColumnType("double precision");

                    b.Property<double>("PurchaseCost")
                        .HasColumnType("double precision");

                    b.Property<int?>("PurchaserId1")
                        .HasColumnType("integer");

                    b.Property<bool>("ReferralIsCredit")
                        .HasColumnType("boolean");

                    b.Property<bool>("ReferralIsPaid")
                        .HasColumnType("boolean");

                    b.Property<int?>("ReferrerId1")
                        .HasColumnType("integer");

                    b.Property<double>("SalePrice")
                        .HasColumnType("double precision");

                    b.Property<double>("SearchPrice")
                        .HasColumnType("double precision");

                    b.Property<int>("Seats")
                        .HasColumnType("integer");

                    b.Property<string>("State_Of_Vehicle")
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .HasColumnType("text");

                    b.Property<string>("Transmission")
                        .HasColumnType("text");

                    b.Property<string>("Trim")
                        .HasColumnType("text");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.Property<string>("Vehicle_Type")
                        .HasColumnType("text");

                    b.Property<string>("Vin")
                        .HasColumnType("text");

                    b.Property<int>("Year")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.HasIndex("BuyerId1");

                    b.HasIndex("MileageId");

                    b.HasIndex("PurchaserId1");

                    b.HasIndex("ReferrerId1");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("CarSales.Models.Feature", b =>
                {
                    b.HasOne("CarSales.Models.Vehicle", null)
                        .WithMany("Features")
                        .HasForeignKey("VehicleId");
                });

            modelBuilder.Entity("CarSales.Models.Maintenance", b =>
                {
                    b.HasOne("CarSales.Models.Vehicle", null)
                        .WithMany("Maintenance")
                        .HasForeignKey("VehicleId");
                });

            modelBuilder.Entity("CarSales.Models.Media", b =>
                {
                    b.HasOne("CarSales.Models.Address", null)
                        .WithMany("Media")
                        .HasForeignKey("AddressId");

                    b.HasOne("CarSales.Models.User", null)
                        .WithMany("Media")
                        .HasForeignKey("UserId");

                    b.HasOne("CarSales.Models.Vehicle", null)
                        .WithMany("Images")
                        .HasForeignKey("VehicleId");
                });

            modelBuilder.Entity("CarSales.Models.User", b =>
                {
                    b.HasOne("CarSales.Models.Address", null)
                        .WithMany("Users")
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CarSales.Models.Vehicle", b =>
                {
                    b.HasOne("CarSales.Models.Address", "Address")
                        .WithMany("Vehicles")
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarSales.Models.User", "Buyer")
                        .WithMany()
                        .HasForeignKey("BuyerId1");

                    b.HasOne("CarSales.Models.Mileage", "Mileage")
                        .WithMany()
                        .HasForeignKey("MileageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarSales.Models.User", "Purchaser")
                        .WithMany()
                        .HasForeignKey("PurchaserId1");

                    b.HasOne("CarSales.Models.User", "Referrer")
                        .WithMany()
                        .HasForeignKey("ReferrerId1");

                    b.Navigation("Address");

                    b.Navigation("Buyer");

                    b.Navigation("Mileage");

                    b.Navigation("Purchaser");

                    b.Navigation("Referrer");
                });

            modelBuilder.Entity("CarSales.Models.Address", b =>
                {
                    b.Navigation("Media");

                    b.Navigation("Users");

                    b.Navigation("Vehicles");
                });

            modelBuilder.Entity("CarSales.Models.User", b =>
                {
                    b.Navigation("Media");
                });

            modelBuilder.Entity("CarSales.Models.Vehicle", b =>
                {
                    b.Navigation("Features");

                    b.Navigation("Images");

                    b.Navigation("Maintenance");
                });
#pragma warning restore 612, 618
        }
    }
}
