'use strict';

const fs = require('fs').promises;
const bcrypt = require('bcryptjs');

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
    let users = JSON.parse(await fs.readFile("./data/users.json", "utf-8"))

    users = users.map(el=>{
      delete el.id
      
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(el.password, salt);
      el.password = hash

      return {
        ...el,
        createdAt : new Date(),
        updatedAt : new Date()
      }
    })

    await queryInterface.bulkInsert('Users',users, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {})
  }
};
