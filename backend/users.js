// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const User = sequelize.define('User', {
  // Define model attributes
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
