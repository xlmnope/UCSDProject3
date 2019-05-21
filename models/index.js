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

db.Item.create({
  item: "Full Metal Burger",
  description: "Fresh, handmade, quarter pound ground beef patty with melted cheese and lettuce, tomato, onion",
  price: 8.00,
  image:"images/fullmetal2.png"

})

module.exports = db;



