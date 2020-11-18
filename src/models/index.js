const Sequelize = require("sequelize");

const { sequelize } = require('../storages/mysqldb');

const ProductModel = require('./product');
const ShopModel = require('./shop');

module.exports.ShopModel = ShopModel(sequelize, Sequelize)
module.exports.ProductModel = ProductModel(sequelize, Sequelize);