--create users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT
)