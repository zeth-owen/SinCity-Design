const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file


const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  logging: config.logging,
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize; // Export Sequelize instance for use in other modules
