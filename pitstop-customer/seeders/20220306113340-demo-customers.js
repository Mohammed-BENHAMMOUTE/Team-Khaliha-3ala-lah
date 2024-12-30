'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Customers', [{
        name: "Mouad MSALEK",
        address: "Hay sadri groupe 2 rue 7",
        city: "Casablanca",
        email: "MouadMsalek@outlook.com",
        postCode: "20450",
        number: "0618346413",
      },
      {
        name: "Anthoine JEVERSON",
        address: "Maarif boulevard fancy",
        city: "Casablanca",
        email: "antoine.jeverson@outlook.com",
        postCode: "20450",
        number: "0618346413",
      },
      {
        name: "Nada DOE",
        address: "Avenue zitouni, chefchaouni",
        city: "Fès",
        email: "nada.doe@gmail.com",
        postCode: "20450",
        number: "0618346413",
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};