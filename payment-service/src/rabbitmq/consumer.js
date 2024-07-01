const { connect } = require('amqplib');
const { storeOrderPayment } = require('../services/payment.services');

module.exports.initializePaymentConsumer = async function() {
  console.log('Initializing Payment Service consumer...');

  const connection = await connect(process.env.AMQP_URI);
  const channel = await connection.createChannel();

  const exchange = 'order_exchange';
  const queue = 'payment_queue';

  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, 'order.created');

  channel.consume(queue, async (msg) => { // async function
    if (msg !== null) {
      const order = JSON.parse(msg.content.toString());
      // console.log('Payment Service received order:', order);

      // Process the order...
      await storeOrderPayment(order);

      channel.ack(msg);
    }
  });

  console.log('Payment Service consumer is consuming messages');
}
