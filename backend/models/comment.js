const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Comment.init({
    // Define attributes here
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: true,
  });

  return Comment;
};

