-- Create the user 'myuser' if not exists
CREATE USER IF NOT EXISTS 'myuser'@'%' IDENTIFIED BY 'mypassword';

-- Grant privileges
GRANT ALL PRIVILEGES ON mydatabase.* TO 'myuser'@'%';

-- Ensure the database exists
CREATE DATABASE IF NOT EXISTS mydatabase;

FLUSH PRIVILEGES;
