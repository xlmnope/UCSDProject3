DROP DATABASE IF EXISTS busy_biteDB;
CREATE DATABASE busy_biteDB;
use busy_biteDB;

create table menu_items (
id int NOT NULL AUTO_INCREMENT,
item varchar(255) NOT NULL,
description varchar(255) NOT NULL,
price varchar(255) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO menu_items (item, description, price) VALUES ('Full Metal Burger', 'Fresh, handmade, quarter pound ground beef patty with melted cheese and lettuce, tomato, onion', '8.00');

INSERT INTO menu_items (item, description, price) VALUES ('Black Bean Society Veggie Burger', '100% non-beef (black bean) patty with melted cheese and lettuce, tomato, and onion', '10.00');

INSERT INTO menu_items (item, description, price) VALUES ('Legion of Shrooms Burger', 'Fresh, handmade, quarter pound ground beef patty with two slices of melted swiss over grilled musrooms and carmelized onions. Served with creamy dijon on the bun', '11.00');

INSERT INTO menu_items (item, description, price) VALUES ('Rest in Pesto (RIP) Burger', 'Fresh, handmade, quarter pound ground beef patty with melted mozzarella over two fresh tomato slices and marinara sauce with basil pesto spread on the bun.', '12.00');

INSERT INTO menu_items (item, description, price) VALUES ('South of Heaven Burger', 'Two fresh, handmade, quarter pound ground beef patties (1/2 pound total) with two slices of spicy cheddar cheese infused with buffalo sauce and hot peppers. Served with hellfire pickles, pickled jalapeno slices, grilled onions, bacon, and sriracha mayo', '14.00');

INSERT INTO menu_items (item, description, price) VALUES ('Getcha Pulled Chicken', 'Slow-cooked shredded chicken, marinated in salsa, served with melted shredded cheese and lettuce, tomato, and onion', '8.00');

INSERT INTO menu_items (item, description, price) VALUES ('Nachos Be Thy Name', 'Tortilla chips smothered in melted, shredded cheese and Getcha Pulled Chicken, topped with a blended guacamole and sour cream sauce. Salsa, jalapenos, and hot peppers served on the side', '8.00');

