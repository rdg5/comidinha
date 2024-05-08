CREATE MIGRATION m1lcb6tyr4fgfhfgosq7yqyimezlffduwvgtxtwkxtep4gvqiaqveq
    ONTO initial
{
  CREATE TYPE default::User {
      CREATE PROPERTY clerkId: std::str;
      CREATE PROPERTY createdAt: cal::local_datetime;
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY updatedAt: cal::local_datetime;
  };
};
