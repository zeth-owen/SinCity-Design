// sequelize.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sincity-design', 'postgres', 'Spikearoo89!', {
  host: 'localhost',
  port: 5433,
  dialect: 'postgres',
  logging: false, // Set to true if you want to see SQL queries
});

module.exports = sequelize;
