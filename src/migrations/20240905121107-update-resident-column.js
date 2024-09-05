"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Residents", "apartmentId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Apartments",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Residents", "apartmentID");
  },
};
