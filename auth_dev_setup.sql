CREATE DATABASE IF NOT EXISTS auth_dev_db;
CREATE USER IF NOT EXISTS 'auth_dev'@'localhost' IDENTIFIED BY 'auth_dev_pwd';
GRANT ALL PRIVILEGES ON auth_dev_db.* TO 'auth_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'auth_dev'@'localhost';
FLUSH PRIVILEGES;