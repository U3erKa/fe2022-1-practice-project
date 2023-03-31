-- @block Count users by role
SELECT role,
  count(*)
FROM "Users"
GROUP BY role;

SELECT id
FROM "Users"
WHERE role = 'creator'
ORDER BY rating DESC,
  id ASC
LIMIT 3 OFFSET 0;

