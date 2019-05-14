DROP DATABASE IF EXISTS busy_biteDB;
CREATE DATABASE busy_biteDB;
USE busy_biteDB;

CREATE TABLE user_profile (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  user_name VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  password VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE orders (
  id INT NOT NULL AUTO_INCREMENT,
  menu_item VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);
