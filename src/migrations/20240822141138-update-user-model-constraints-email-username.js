'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Users", {
      fields: ["email", "username"],
      type: "unique",
      name: "custom_unique_constraint_username_email",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Users",
      "custom_unique_constraint_username_email"
    );
  },
};
