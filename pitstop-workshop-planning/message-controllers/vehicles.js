
let db = require("../models");
let chalk = require("chalk");
let logger = require("winston");

const controller = {};

controller.added = async (message) => {
  try {
    const content = JSON.parse(message.content.toString());
    await db.Vehicle.create({
      license: content.license,
      brand: content.brand,
      type: content.type,
      owner: content.owner
    });
     // TODO VEHICLE.ADDED consume event
     logger.info(chalk.green(`VEHICLE.ADDED has been consumed from service: ${process.env.SERVICE_NAME} with added vehicle license: ${content.license}`))
  } catch (err) {
    console.error(`Error in handling the recieved message - vehicle.added - ${err}`);
  }
};

controller.deleted = async (message) => {
  try {
    const content = parseInt(message.content.toString());
    await db.Vehicle.destroy({
      where: {
        license: content
      }
    });

    // TODO VEHICLE.DELETED consume event
    logger.info(chalk.green(`VEHICLE.DELETED has been consumed from service: ${process.env.SERVICE_NAME} with deleted vehicle license: ${content}`))
  } catch (err) {
    console.error(`Error in handling the recieved message - vehicle.deleted - ${err}`);
  }
};

module.exports = controller;