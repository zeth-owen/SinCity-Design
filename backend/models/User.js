'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Comment }) {
      // Example association with Comment model
      User.hasMany(Comment, { as: 'author', foreignKey: 'author_id' });
    }
  }

  User.init({
    userId: {
      type: DataTypes.INTEGER, // Adjusted to INTEGER assuming potentially large number of users
      primaryKey: true,
      autoIncrement: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true // Ensure email is unique
    },
    role: {
      type: DataTypes.ENUM,
      values: ['reviewer', 'admin'],
    },
    passwordDigest: DataTypes.STRING, // Assuming this holds a hashed password
  }, {
    sequelize,
    underscored: true, // Use snake_case for column names
    modelName: 'User', // Model name in singular form
  });

  return User;
};
