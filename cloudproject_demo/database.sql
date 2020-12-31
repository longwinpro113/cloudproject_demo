
CREATE TABLE account ( username VARCHAR(50) PRIMARY KEY, password TEXT, fullname VARCHAR(50), phone VARCHAR(11), birthday DATE, age INT );
CREATE TABLE category ( id INT PRIMARY KEY, name VARCHAR(20) );
CREATE TABLE subcategory ( id INT PRIMARY KEY, name VARCHAR(20), description VARCHAR(50), category_id INT, FOREIGN KEY (category_id) REFERENCES category (id) );
CREATE TABLE product ( id INT PRIMARY KEY, name VARCHAR(50), description TEXT, price REAL,  brand VARCHAR(20), country VARCHAR(20) );
CREATE TABLE product_subcategory ( subcategory_id INT, product_id INT, FOREIGN KEY (product_id) REFERENCES product (id), FOREIGN KEY (subcategory_id) REFERENCES subcategory (id) ); 


INSERT INTO product VALUES (1, "LAMBORGHINI ELEMENTO", '200000', "Hot Wheel", "Viet Nam"); 
