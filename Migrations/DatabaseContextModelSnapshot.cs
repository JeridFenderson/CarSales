﻿// <auto-generated />
using System;
using System.Collections.Generic;
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
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Postal_Code")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Region")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("CarSales.Models.Dealer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("AddressId")
                        .HasColumnType("integer");

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

                    b.Property<List<int>>("MediaId")
                        .HasColumnType("integer[]");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.ToTable("Dealers");
                });

            modelBuilder.Entity("CarSales.Models.Maintenance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<double>("Cost")
                        .HasColumnType("double precision");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Task")
                        .HasColumnType("text");

                    b.Property<int>("VehicleId")
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

                    b.Property<int>("Bytes")
                        .HasColumnType("integer");

                    b.Property<int?>("DealerId")
                        .HasColumnType("integer");

                    b.Property<string>("Format")
                        .HasColumnType("text");

                    b.Property<string>("InternalDescription")
                        .HasColumnType("text");

                    b.Property<int>("InternalListOrder")
                        .HasColumnType("integer");

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

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<int>("VehicleId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DealerId");

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
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Value")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Mileage");
                });

            modelBuilder.Entity("CarSales.Models.Referral", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("FromFirstName")
                        .HasColumnType("text");

                    b.Property<bool>("IsPaid")
                        .HasColumnType("boolean");

                    b.Property<double>("PaymentAmountDue")
                        .HasColumnType("double precision");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<int?>("UserId1")
                        .HasColumnType("integer");

                    b.Property<int?>("UserId2")
                        .HasColumnType("integer");

                    b.Property<int>("VehicleId")
                        .HasColumnType("integer");

                    b.Property<double>("VehicleSalePrice")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("UserId1");

                    b.HasIndex("UserId2");

                    b.ToTable("Referrals");
                });

            modelBuilder.Entity("CarSales.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("DealerId")
                        .HasColumnType("integer");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<List<int>>("FromId")
                        .HasColumnType("integer[]");

                    b.Property<string>("HashedPassword")
                        .HasColumnType("text");

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsOwner")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("LastActive")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<List<int>>("ReferredById")
                        .HasColumnType("integer[]");

                    b.HasKey("Id");

                    b.HasIndex("DealerId");

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
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Condition")
                        .HasColumnType("text");

                    b.Property<string>("Date_First_On_Lot")
                        .HasColumnType("text");

                    b.Property<string>("Date_Sold")
                        .HasColumnType("text");

                    b.Property<string>("Dealer_Id")
                        .HasColumnType("text");

                    b.Property<string>("Dealer_Name")
                        .HasColumnType("text");

                    b.Property<string>("Dealer_Phone")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Drivetrain")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Exterior_Color")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Fb_Page_Id")
                        .HasColumnType("integer");

                    b.Property<List<string>>("Features")
                        .HasColumnType("text[]");

                    b.Property<string>("Fuel_Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<List<int>>("ImagesId")
                        .HasColumnType("integer[]");

                    b.Property<string>("Interior_Color")
                        .HasColumnType("text");

                    b.Property<bool>("IsCpo")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsListed")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsReferral")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsSearchRequest")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsSold")
                        .HasColumnType("boolean");

                    b.Property<float>("Latitude")
                        .HasColumnType("real");

                    b.Property<double>("ListPrice")
                        .HasColumnType("double precision");

                    b.Property<float>("Longitude")
                        .HasColumnType("real");

                    b.Property<List<int>>("MaintenanceId")
                        .HasColumnType("integer[]");

                    b.Property<string>("Make")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("MileageId")
                        .HasColumnType("integer");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("PurchaseCost")
                        .HasColumnType("double precision");

                    b.Property<double>("SalePrice")
                        .HasColumnType("double precision");

                    b.Property<string>("Transmission")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Trim")
                        .HasColumnType("text");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<string>("Vehicle_Type")
                        .HasColumnType("text");

                    b.Property<string>("Vin")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Year")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.HasIndex("MileageId");

                    b.HasIndex("UserId");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("CarSales.Models.Dealer", b =>
                {
                    b.HasOne("CarSales.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Address");
                });

            modelBuilder.Entity("CarSales.Models.Maintenance", b =>
                {
                    b.HasOne("CarSales.Models.Vehicle", null)
                        .WithMany("Maintenance")
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CarSales.Models.Media", b =>
                {
                    b.HasOne("CarSales.Models.Dealer", null)
                        .WithMany("Media")
                        .HasForeignKey("DealerId");

                    b.HasOne("CarSales.Models.User", "User")
                        .WithMany("Media")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarSales.Models.Vehicle", null)
                        .WithMany("Images")
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("CarSales.Models.Referral", b =>
                {
                    b.HasOne("CarSales.Models.User", null)
                        .WithMany("From")
                        .HasForeignKey("UserId1");

                    b.HasOne("CarSales.Models.User", null)
                        .WithMany("ReferredBy")
                        .HasForeignKey("UserId2");
                });

            modelBuilder.Entity("CarSales.Models.User", b =>
                {
                    b.HasOne("CarSales.Models.Dealer", "Dealer")
                        .WithMany()
                        .HasForeignKey("DealerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dealer");
                });

            modelBuilder.Entity("CarSales.Models.Vehicle", b =>
                {
                    b.HasOne("CarSales.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarSales.Models.Mileage", "Mileage")
                        .WithMany()
                        .HasForeignKey("MileageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarSales.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Address");

                    b.Navigation("Mileage");

                    b.Navigation("User");
                });

            modelBuilder.Entity("CarSales.Models.Dealer", b =>
                {
                    b.Navigation("Media");
                });

            modelBuilder.Entity("CarSales.Models.User", b =>
                {
                    b.Navigation("From");

                    b.Navigation("Media");

                    b.Navigation("ReferredBy");
                });

            modelBuilder.Entity("CarSales.Models.Vehicle", b =>
                {
                    b.Navigation("Images");

                    b.Navigation("Maintenance");
                });
#pragma warning restore 612, 618
        }
    }
}
