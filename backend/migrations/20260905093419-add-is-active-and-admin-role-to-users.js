'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "isActive", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    // await queryInterface.changeColumn("users", "role", {
    //   type: Sequelize.ENUM("Admin", "Student", "Faculty"),
    //   allowNull: false,
    //   defaultValue: "Student",
    // });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "isActive");

    await queryInterface.changeColumn("users", "role", {
      type: Sequelize.ENUM("Student", "Faculty"),
      allowNull: false,
      defaultValue: "Student",
    });
  },
};
