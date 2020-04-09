--login user (check password)
SELECT * FROM users
WHERE username = $1;