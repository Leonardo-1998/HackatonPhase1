'use strict';

const fs = require('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let amenities = JSON.parse(await fs.readFile("./data/amenities.json", "utf-8"))
    // console.log(amenities)
    amenities = amenities.map(el=>{
      delete el.id

      return {
        ...el,
        createdAt : new Date(),
        updatedAt : new Date()
      }
    })

    await queryInterface.bulkInsert('Amenities',amenities, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Amenities", null, {})
  }
};
