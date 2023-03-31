-- @block Count users by role
SELECT role,
  count(*)
FROM "Users"
GROUP BY role;

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
