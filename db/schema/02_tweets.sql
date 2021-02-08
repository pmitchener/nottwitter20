DROP TABLE IF EXISTS tweets CASCADE;

CREATE TABLE "tweets" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
  "message" varchar(255) NOT NULL,  
  "created_at" TIMESTAMP default current_timestamp
);
ALTER TABLE "tweets" ADD CONSTRAINT key_uniq UNIQUE ("id", "user_id");