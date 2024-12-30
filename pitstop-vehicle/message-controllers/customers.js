
let db = require("../models");
let chalk = require("chalk");
let logger = require("winston");

const controller = {};

controller.added = async (message) => {
  try {
    const content = JSON.parse(message.content.toString());
    console.log(content)
    await db.Customer.create({
      id: content.id,
      name: content.name
    });

    // TODO CUSTOMER.ADDED consume event
    logger.info(chalk.green(`CUSTOMER.ADDED has been consumed from service: ${process.env.SERVICE_NAME} with added customer name: ${content.name}`))
  } catch (err) {
    logger.error(`Error in handling the recieved message - customer.added - ${err}`);
  }
};
controller.deleted = async (message) => {
  try {
    const content = parseInt(message.content.toString());
    await db.Customer.destroy({
      where: {
        id: content
      }
    });
    // TODO CUSTOMER.DELETED consume event
    logger.info(chalk.green(`CUSTOMER.DELETED has been consumed from service: ${process.env.SERVICE_NAME} with deleted customer id: ${content.id}`))
  } catch (err) {
    logger.error(`Error in handling the recieved message - customer.deleted - ${err}`);
  }
};

module.exports = controller;