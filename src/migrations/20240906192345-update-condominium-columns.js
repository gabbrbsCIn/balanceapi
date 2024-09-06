"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Condominiums", "residentAdminId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Residents",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Condominiums", "residentAdminId");
  },
};
