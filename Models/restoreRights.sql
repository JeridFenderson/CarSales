UPDATE "Users"
SET "IsAdmin" = True
WHERE "FirstName" = 'Jerid';

UPDATE "Users"
SET "IsOwner" = True
WHERE "FirstName" = 'Jerid';


-- run only after you create your non admin account manually
-- psql --file=Models/restoreRights.sql CarSalesDatabase