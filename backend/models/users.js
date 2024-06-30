'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Example association with Comment model
      User.hasMany(models.Comment, { as: 'comments', foreignKey: 'userId' });
    }
  }

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM('reviewer', 'admin'),
      allowNull: false,
      defaultValue: 'reviewer',
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true, 
    underscored: true, 
  });

  return User;
};




