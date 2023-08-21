-- @block Conversation
CREATE TABLE "conversations" (
  "_id" SERIAL PRIMARY KEY,
  "favoriteList" BOOLEAN [] NOT NULL,
  "blackList" BOOLEAN [] NOT NULL,
  "createdAt" DATE NOT NULL DEFAULT current_date,
  "updatedAt" DATE NOT NULL DEFAULT current_date
);
-- @block Catalog
CREATE TABLE "catalogs" (
  "_id" SERIAL PRIMARY KEY,
  "userId" INT NOT NULL REFERENCES "Users",
  "catalogName" VARCHAR(255) NOT NULL
);
-- @block Catalogs_to_conversations
CREATE TABLE "catalogs_to_conversations" (
  "catalogId" INT NOT NULL REFERENCES "catalogs",
  "conversationId" INT NOT NULL REFERENCES "conversations",
  PRIMARY KEY ("catalogId", "conversationId")
);
-- @block Message
CREATE TABLE "messages" (
  "_id" SERIAL PRIMARY KEY,
  "sender" INT NOT NULL UNIQUE REFERENCES "Users",
  "body" TEXT NOT NULL,
  "conversation" INT NOT NULL UNIQUE REFERENCES "conversations",
  "createdAt" DATE NOT NULL DEFAULT current_date,
  "updatedAt" DATE NOT NULL DEFAULT current_date
);
