DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL (6,2),
	stock_quantity INTEGER NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Electronics", 0299.99, 20), ("Towels", "Linens", 0010.99, 50), ("Sheets", "Linens",0029.99, 75), ("Mops", "Cleaning Supplies", 0012.99, 100), ("Brooms", "Cleaning SUpplies", 0011.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Collars", "Pet Supplies", 0019.99, 89), ("Dog Bones", "Pet Supplies",0004.99, 97), ("Spiral Notebook", "Office Supplies", 0013.00, 35), ("Ball Point Pens", "Office Supplies", 0007.50, 250), ("Pencils", "Office Supplies", 0000.99, 301);

SELECT * FROM products;