'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     * Rename the table from 'user' to 'users'.
     */
    await queryInterface.renameTable('user', 'Users');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     * Rename the table back from 'users' to 'user'.
     */
    await queryInterface.renameTable('users', 'User');
  }
};

