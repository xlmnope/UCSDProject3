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
