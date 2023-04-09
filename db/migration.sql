-- @block Conversation
CREATE TABLE "conversations" (
  "_id" SERIAL PRIMARY KEY,
  "favoriteList" BOOLEAN [] NOT NULL,
  "blackList" BOOLEAN [] NOT NULL,
  "createdAt" DATE NOT NULL DEFAULT current_date,
  "updatedAt" DATE NOT NULL DEFAULT current_date
);
