'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Shop, {
        foreignKey: 'shop_id',
        targetKey: 'shop_id',
      });
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
    colors: {
      type: DataTypes.JSON,
      get: function() {
        const colors = this.getDataValue('colors');
        if (typeof colors === 'string') {
          return JSON.parse(colors);
        }

        return colors;
      },
    },
    sizes: {
      type: DataTypes.JSON,
      get: function() {
        const sizes = this.getDataValue('sizes');
        if (typeof sizes === 'string') {
          return JSON.parse(sizes);
        }

        return sizes;
      },
    },
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};