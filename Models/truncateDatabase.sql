truncate table "Vehicles", "Users", "Address", "Mileage", "Media", "Referrals", "Dealers";
drop table "Vehicles", "Users", "Mileage", "Media", "Maintenance", "Mileage", "DeletedVehicles", "Features", "Addresses", "__EFMigrationsHistory";
-- INSERT INTO "Users" ("FirstName", "LastName", "Email", "HashedPassword", "IsAdmin", "IsOwner")
-- VALUES ('Jerid', 'Fenderson', 'jrfenderson@gmail.com', 'AQAAAAEAACcQAAAAEPz76YM5dn1JBGmQsyK4tS96GjMFPMME6W2ahYU63ceBDjVFpKZpXZ77BxLSJn4wqg', True, True);
-- INSERT INTO "Vehicles" ("UserId", "Year", "Make", "Model", "Price", "Odometer", "FuelType", "Description") VALUES (4, 1998, 'Honda', 'Civic', 2500, 114000, 'Gas', 'Lorem ipsum dolor sit amet consectetur adipisicing
--               elit. Odit perspiciatis nihil iure enim molestias eius at quasi
--               ratione quae sint nemo modi.');

-- INSERT INTO "Vehicles" ("UserId", "Year", "Make", "Model", "Price", "Odometer", "FuelType", "Description") VALUES (4, 1998, 'Chevrolet', 'Cruze', 2800, 90000, 'Gas', 'Lorem ipsum dolor sit amet consectetur adipisicing
--               elit. Odit perspiciatis nihil iure enim molestias eius at quasi
--               ratione quae sint nemo modi.');

-- INSERT INTO "Vehicles" ("UserId", "Year", "Make", "Model", "Price", "Odometer", "FuelType", "Description") VALUES (4, 2015, 'Ram', '2500', 25000, 60000, 'Diseal', 'Lorem ipsum dolor sit amet consectetur adipisicing
--               elit. Odit perspiciatis nihil iure enim molestias eius at quasi
--               ratione quae sint nemo modi.');

-- INSERT INTO "Vehicles" ("UserId", "Year", "Make", "Model", "Price", "Odometer", "FuelType", "Description") VALUES (4, 2008, 'Toyota', 'Prius', 4000, 87600, 'Gas', 'Lorem ipsum dolor sit amet consectetur adipisicing
--               elit. Odit perspiciatis nihil iure enim molestias eius at quasi
--               ratione quae sint nemo modi.');

-- INSERT INTO "Vehicles" ("UserId", "Year", "Make", "Model", "Price", "Odometer", "FuelType", "Description") VALUES (4, 1973, 'Chevrolet', 'C10', 4000, 99999, 'Gas', 'Lorem ipsum dolor sit amet consectetur adipisicing
--               elit. Odit perspiciatis nihil iure enim molestias eius at quasi
--               ratione quae sint nemo modi.');

-- in Backend directory
-- psql --file=Models/truncateDatabase.sql CarSalesDatabase