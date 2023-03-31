-- @block Count users by role
SELECT role,
  count(*)
FROM "Users"
GROUP BY role;

-- @block Send 10% cashback for customers' orders during holidays
SELECT "Users".id,
  sum("Contests".prize)
FROM "Users"
  INNER JOIN "Contests" ON "Users".id = "Contests"."userId"
WHERE role = 'customer'
  AND "Contests"."createdAt" BETWEEN '2022-12-25' AND '2023-01-14'
GROUP BY "Users".id;

-- @block Add $10 for top 3 creators
UPDATE "Users"
SET balance = balance + 10
WHERE "Users".id IN(
    SELECT id
    FROM "Users"
    WHERE role = 'creator'
    ORDER BY rating DESC,
      id ASC
    LIMIT 3 OFFSET 0
  );
