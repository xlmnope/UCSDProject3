'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js' )[env];
const db = {};

console.log("config is: ",config);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Item = sequelize.define('menu_item', {
  item: {
    type: Sequelize.DataTypes.STRING
  },
  description: {
    type: Sequelize.DataTypes.STRING
  },
  price: {
    type: Sequelize.DataTypes.DECIMAL
  },
  image: {
    type: Sequelize.DataTypes.STRING
  }
})
const seeds = [
  {
    item: "Full Metal Burger",
    description: "Fresh, handmade, quarter pound ground beef patty with melted cheese and lettuce, tomato, onion",
    price: 8.00,
    image:"images/fullmetal2.png"},
  {
    item: "Black Bean Society Veggie Burger",
    description: "100% non-beef (black bean) patty with melted cheese and lettuce, tomato, and onion",
    price: 10.00,
    image:"images/blackbean.png"
  },
  {
    item: "Legion of Shrooms Burger",
    description: "Fresh, handmade, quarter pound ground beef patty with two slices of melted swiss over grilled musrooms and carmelized onions. Served with creamy dijon on the bun",
    price: 11.00,
    image:"images/legionofshrooms.jpg"
  },
  {
    item: "Rest in Pesto (RIP) Burger'",
    description: "Fresh, handmade, quarter pound ground beef patty with melted mozzarella over two fresh tomato slices and marinara sauce with basil pesto spread on the bun.",
    price: 12.00,
    image:"images/restinpesto.jpg"
  },
  {
    item: "South of Heaven Burger",
    description: "Two fresh, handmade, quarter pound ground beef patties (1/2 pound total) with two slices of spicy cheddar cheese infused with buffalo sauce and hot peppers. Served with hellfire pickles, pickled jalapeno slices, grilled onions, bacon, and sriracha mayo",
    price: 14.00,
    image:"images/southofheaven.jpeg"
  },
  {
    item: "Getcha Pulled Chicken",
    description: "Slow-cooked shredded chicken, marinated in salsa, served with melted shredded cheese and lettuce, tomato, and onion",
    price: 8.00,
    image:"images/getchapulledchicken.jpg"
  },
  {
    item: "Nachos Be Thy Name",
    description: "Tortilla chips smothered in melted, shredded cheese and Getcha Pulled Chicken, topped with a blended guacamole and sour cream sauce. Salsa, jalapenos, and hot peppers served on the side",
    price: 8.00,
    image:"images/nachos.jpg"
  },
]

db.Item.bulkCreate(seeds);

db.Item = sequelize.define('menu_item', {
  item: {
    type: Sequelize.DataTypes.STRING
  },
  description: {
    type: Sequelize.DataTypes.STRING
  },
  price: {
    type: Sequelize.DataTypes.DECIMAL
  },
  image: {
    type: Sequelize.DataTypes.STRING
  }


})

db.Checkout = sequelize.define('checkout', {
  items: {
    type: Sequelize.STRING,
    get() {
      return this.getDataValue('items').split(';')
    },
    set(val) {
      this.setDataValue('items',val.join(';'));
    }
  }
})

module.exports = db;





