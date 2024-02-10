'use strict';

const bcrypt = require('bcryptjs/dist/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
        name: 'Administrator',
        email: 'admin@gobarber.com',
        password_hash: bcrypt.hashSync('123456', 8),
        created_at: new Date(),
        updated_at: new Date()
  },
], {})},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
