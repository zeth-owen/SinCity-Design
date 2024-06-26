// sequelize.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Set to true if you want to see SQL queries
});

module.exports = sequelize;
