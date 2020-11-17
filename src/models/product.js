'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'deleted', 'not-available'],
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    colours: DataTypes.JSON,
    sizes: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};