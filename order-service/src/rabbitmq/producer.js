const { connect } = require('amqplib');

module.exports.publishOrder = async function(order) {
  try {
    const connection = await connect(process.env.AMQP_URI);
    const channel = await connection.createChannel();

    // Publish the order message to the exchange
    channel.publish(
      exchange,
      'order.created',
      Buffer.from(JSON.stringify(order)),
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );

    // close connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
  }
}
