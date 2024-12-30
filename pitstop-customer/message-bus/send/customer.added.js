const amqp = require('amqp-ts-async');
const exchangeName = 'customer.added';
const messageBus = `amqp://${process.env.MESSAGE_BUS_USERNAME}:${process.env.MESSAGE_BUS_PASSWORD}@${process.env.MESSAGE_BUS}:5672`
module.exports = {
  send: (customer) => {
    try {
      if (!customer) {
        throw new Error('Should send a valid customer to the queue');
      }
      const connection = new amqp.Connection(messageBus);
      const exchange = connection.declareExchange(exchangeName, 'fanout', { durable: false });
      const message = new amqp.Message(JSON.stringify(customer));
      exchange.send(message);
      setTimeout(() => {
        connection.close();
      }, process.env.MESSAGE_BUS_TIMEOUT);
    } catch (err) {
      logger.error(`Error Sending Customer Added Event to ${exchangeName}: ${err}`);
    }
  },
};