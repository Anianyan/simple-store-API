const config = require('config');
const { Sequelize } = require('sequelize');

const mysqlConnection = config.get('db.connection.mysql');

const sequelize = new Sequelize(
  mysqlConnection.database, 
  mysqlConnection.user, 
  mysqlConnection.password, 
  {
    host: mysqlConnection.host,
    dialect: 'mysql',
  }
);

module.exports = {
  sequelize,
};
