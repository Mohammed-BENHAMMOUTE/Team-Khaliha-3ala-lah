'use strict';
let moment = require("moment")

module.exports = {
  async up(queryInterface, Sequelize) {
    let date = moment().format("YYYY-MM-DD");

    await queryInterface.bulkInsert('Customers', [{
      id: 1,
      name: "Mouad MSALEK",
      email: "MouadMsalek@outlook.com",
      number: "0618346413",
    },
    {
      id: 2,
      name: "Anthoine JEVERSON",
      email: "antoine.jeverson@outlook.com",
      number: "0618346413",
    },
    {
      id: 3,
      name: "Nada DOE",
      email: "nada.doe@gmail.com",
      number: "0618346413",
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

    await queryInterface.bulkInsert('MaintenanceJobs', [{
      startTime: moment(date + ' ' + "08:00" + ':00', "YYYY-MM-DD HH:mm:ss"),
      endTime: moment(date + ' ' + "09:00" + ':00', "YYYY-MM-DD HH:mm:ss"),
      description: "Change tires",
      status: "planned",
      vehicle: "15423|a|12",
    },
    {
      startTime: moment(date + ' ' + "09:30" + ':00', "YYYY-MM-DD HH:mm:ss"),
      endTime: moment(date + ' ' + "11:00" + ':00', "YYYY-MM-DD HH:mm:ss"),
      description: "Chaning color, replacing windows",
      status: "planned",
      vehicle: "15424|h|12",
    },
    {
      startTime: moment(date + ' ' + "13:00" + ':00', "YYYY-MM-DD HH:mm:ss"),
      endTime: moment(date + ' ' + "14:25" + ':00', "YYYY-MM-DD HH:mm:ss"),
      description: "Changing tires",
      status: "planned",
      vehicle: "12224|h|4",
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
