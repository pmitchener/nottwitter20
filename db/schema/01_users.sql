DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "email" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,  
  "name" varchar(255) NOT NULL,
  "avatar" varchar(255)
);
ALTER TABLE "users" ADD CONSTRAINT email_uniq UNIQUE ("email");