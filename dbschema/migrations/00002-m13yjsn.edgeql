CREATE MIGRATION m13yjsnnbkwpbsk2eabaukqt7ewwmh6n36evw6j5cm5o735a3p7wla
    ONTO m1lcb6tyr4fgfhfgosq7yqyimezlffduwvgtxtwkxtep4gvqiaqveq
{
  CREATE TYPE default::Photo {
      CREATE LINK User: default::User;
      CREATE REQUIRED PROPERTY IsFinalized: std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY PhotoID: std::uuid {
          SET default := (std::uuid_generate_v4());
      };
      CREATE REQUIRED PROPERTY PhotoURL: std::str;
      CREATE REQUIRED PROPERTY UploadDate: cal::local_date;
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK Photos: default::Photo;
  };
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY CreatedAt: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY UserID: std::uuid {
          SET default := (std::uuid_generate_v4());
      };
  };
  ALTER TYPE default::User {
      DROP PROPERTY clerkId;
  };
  ALTER TYPE default::User {
      DROP PROPERTY createdAt;
  };
  ALTER TYPE default::User {
      ALTER PROPERTY email {
          RENAME TO Email;
      };
  };
  ALTER TYPE default::User {
      DROP PROPERTY name;
      DROP PROPERTY updatedAt;
  };
};
