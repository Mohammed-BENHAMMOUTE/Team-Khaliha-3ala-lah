const amqp = require('amqp-ts-async');
const customerMessageController = require('../../message-controllers/customers');

const exchangeName = 'customer.deleted';
const messageBus = `amqp://${process.env.MESSAGE_BUS_USERNAME}:${process.env.MESSAGE_BUS_PASSWORD}@${process.env.MESSAGE_BUS}:5672`
const queueName = '';

const connection = new amqp.Connection(messageBus);
const exchange = connection.declareExchange(exchangeName, 'fanout', { durable: false });
const queue = connection.declareQueue(queueName, { exclusive: true });
queue.bind(exchange);

module.exports = {
  start: () => {
    try {
      queue.activateConsumer(customerMessageController.deleted);
    } catch (err) {
      logger.error(`Error Listening to ${exchangeName}, ${queueName}: ${err}`);
    }
  },
};