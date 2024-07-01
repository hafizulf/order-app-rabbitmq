const { connect } = require('amqplib');

module.exports.initializeGeneralConsumer = async function () {
  console.log('Initializing General Service consumer...');

  const connection = await connect(process.env.AMQP_URI);
  const channel = await connection.createChannel();

  // Define the existing exchange name and queue name
  const exchange = 'order_exchange';
  const queue = 'general_queue';

  // Assert the queue (creating it if it doesn't exist) and bind it to the existing exchange
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, 'order.created');

  // Consume messages from the queue
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const order = JSON.parse(msg.content.toString());
      console.log('General Service received order:', order);

      // Process the order...

      channel.ack(msg);
    }
  });

  console.log('General Service consumer is consuming messages');
};
