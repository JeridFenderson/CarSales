UPDATE "Users"
SET "Role" = 'OWNER'
WHERE "FirstName" = 'Jerid';

INSERT INTO "Addresses" ("Addr1", "City", "Region", "Country", "Postal_Code") VALUES ('1 Way Blvd', 'St Petersburg', 'FL', 'US', '33712');
INSERT INTO "Dealers" ("Fb_Page_Id", "Dealer_Id", "Dealer_Name", "Dealer_Phone", "AddressId", "Latitude", "Longitude", "Url")
 VALUES (35, 'Stuff','Cheap & Easy Auto', '602-540-9454', 3, 1, 2, 'www.cheapandeasyauto.com');
 Id   | Fb_Page_Id   | Dealer_Id   | Dealer_Name   | Dealer_Phone   | AddressId   | Latitude   | Longitude   | Url   | DateOfEntryCreation   | OwnerId

-- run only after you create your non admin account manually
-- psql --file=Models/restoreRights.sql CarSalesDatabase