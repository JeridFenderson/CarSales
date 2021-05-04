drop table "Vehicles", "Users", "Mileage", "Media", "Maintenance", "Mileage", "DeletedVehicles", "Features", "Addresses", "__EFMigrationsHistory";

INSERT INTO "Addresses" ("Fb_page_id", "Dealer_id", "Dealer_name", "Dealer_phone", "Latitude", "Longitude", "Url", "Addr1", "City", "Region", "Country", "Postal_code", "DateOfEntryCreation")
    VALUES (1, 1,'CPA' ,'602-540-9454', 1, 2, 'www.cheapandeasyauto.com', '1 Way Blvd', 'St Petersburg', 'FL', 'US', '33712', 'Today');

-- Must create account through website
UPDATE "Users"
SET "Tier" = 7
WHERE "FirstName" = 'Jerid';


-- run only after you create your non admin account manually
-- psql --file=Models/ResetDB.sql CarSalesDatabase