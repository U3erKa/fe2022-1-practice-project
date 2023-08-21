-- @block Create conversation
INSERT INTO "conversations" ("favoriteList", "blackList")
VALUES ('{true, false}', '{false, true}'),
  ('{false, false}', '{false, false}'),
  ('{false, false}', '{false, false}'),
  ('{false, false}', '{false, false}')
RETURNING *;
-- @block Add users to conversations
INSERT INTO "Users_to_conversations" ("userId", "conversationId")
VALUES (1, 1),
  (2, 1),
  (3, 2),
  (4, 2)
RETURNING *;
-- @block Create catalogs for users
INSERT INTO "catalogs" ("userId", "catalogName")
VALUES (1, 'Catalog 1'),
  (2, 'Catalog 2'),
  (2, 'Catalog 3'),
  (1, 'Catalog 3')
RETURNING *;
-- @block Add conversations to catalogs
INSERT INTO "catalogs_to_conversations" ("catalogId", "conversationId")
VALUES (1, 1),
  (2, 1),
  (3, 2),
  (4, 2)
RETURNING *;
-- @block Add messages to conversations
INSERT INTO "messages" ("sender", "body", "conversation")
VALUES (1, 'Message 1', 1),
  (2, 'Message 2', 1),
  (3, 'Message 3', 2),
  (4, 'Message 4', 2)
RETURNING *;
