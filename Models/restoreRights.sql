UPDATE "Users"
SET "Tier" = 7
WHERE "FirstName" = 'Jerid';


INSERT INTO "Addresses" ("Fb_Page_Id", "Dealer_Id", "Dealer_Name", "Dealer_Phone", "Latitude", "Longitude", "Url", "Addr1", "City", "Region", "Country", "Postal_Code", "DateOfEntryCreation")
    VALUES (1, 1,'CPA' ,'602-540-9454', 1, 2, 'www.cheapandeasyauto.com', '1 Way Blvd', 'St Petersburg', 'FL', 'US', '33712', 'Today');

 Id   | Fb_Page_Id   | Dealer_Id   | Dealer_Name   | Dealer_Phone   | AddressId   | Latitude   | Longitude   | Url   | DateOfEntryCreation   | OwnerId

-- run only after you create your non admin account manually
-- psql --file=Models/restoreRights.sql CarSalesDatabase