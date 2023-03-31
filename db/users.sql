-- @block Count users by role
SELECT role,
  count(*)
FROM "Users"
GROUP BY role;
