const amqp = require('amqp-ts-async');
const exchangeName = 'vehicle.added';
const messageBus = `amqp://${process.env.MESSAGE_BUS_USERNAME}:${process.env.MESSAGE_BUS_PASSWORD}@${process.env.MESSAGE_BUS}:5672`
module.exports = {
  send: (vehicle) => {
    try {
      if (!vehicle) {
        throw new Error('Should send a valid vehicle to the queue');
      }
      const connection = new amqp.Connection(messageBus);
      const exchange = connection.declareExchange(exchangeName, 'fanout', { durable: false });
      const message = new amqp.Message(JSON.stringify(vehicle));
      exchange.send(message);
      setTimeout(() => {
        connection.close();
      }, process.env.MESSAGE_BUS_TIMEOUT);
    } catch (err) {
      logger.error(`Error Sending vehicle Added Event to ${exchangeName}: ${err}`);
    }
  },
};