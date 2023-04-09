-- @block Conversation
CREATE TABLE "conversations" (
  "_id" SERIAL PRIMARY KEY,
  "favoriteList" BOOLEAN [] NOT NULL,
  "blackList" BOOLEAN [] NOT NULL,
  "createdAt" DATE NOT NULL DEFAULT current_date,
  "updatedAt" DATE NOT NULL DEFAULT current_date
);
-- @block Users_to_conversations
CREATE TABLE "Users_to_conversations" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "Users",
  "conversationId" INTEGER NOT NULL REFERENCES "conversations",
  UNIQUE ("userId", "conversationId")
);
-- @block Catalog
CREATE TABLE "catalogs" (
  "_id" SERIAL PRIMARY KEY,
  "userId" INT NOT NULL REFERENCES "Users",
  "catalogName" VARCHAR(255) NOT NULL
);
