'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Reservations","check_in",{type:Sequelize.DATE})
    await queryInterface.addColumn("Reservations","check_out",{type:Sequelize.DATE})
    await queryInterface.addColumn("Reservations","RoomId",{
      type:Sequelize.INTEGER,
      references: {
        model: 'Rooms',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Reservations","check_in")
    await queryInterface.removeColumn("Reservations","check_out")
    await queryInterface.removeColumn("Reservations","RoomId")
  }
};
