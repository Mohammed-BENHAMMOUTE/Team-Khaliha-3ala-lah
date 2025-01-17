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
      id: 1,
      name: "Mouad MSALEK",
    },
    {
      id: 2,
      name: "Anthoine JEVERSON",
    },
    {
      id: 3,
      name: "Nada DOE",
    }
    ], {});
    await queryInterface.bulkInsert('Vehicles', [{
      license: "15423|a|12",
      brand: "Dacia",
      type: "Logan",
      owner: 1
    },
    {
      license: "15424|h|12",
      brand: "Land rover",
      type: "Rand rover",
      owner: 2
    },
    {
      license: "12224|h|4",
      brand: "Fiat",
      type: "Punto",
      owner: 3
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
    await queryInterface.bulkDelete('Customers', null, {});
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};
