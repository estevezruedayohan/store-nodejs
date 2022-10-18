'use strict';

const { UserSchema, USER_TABLE } = require('../models/user.model');
// Aqui se pueden realizar las migraciones de otras tablas
// y de correr otros comandos, se usa solo este como ejemplo

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
