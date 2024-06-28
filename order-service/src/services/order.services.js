const axios = require('axios')
const NotFoundError = require('../exceptions/NotFoundError');
const repository = require('../repositories/order.repository');
const { connect } = require('amqplib');

// This service use as producer to send order information
module.exports.store = async (data) => {
  // checking customer and menu from general service
  let customer;
  let menu;
  try {
    const response = await axios.get(`${process.env.GENERAL_SERVICE_URL}customers/${data.customerId}`);
    customer = response.data.data;
  } catch (e) {
    console.log(
      `failed get data from ${process.env.GENERAL_SERVICE_URL}/customers/${data.customerId}: ` +
        e.message
    );
    throw new NotFoundError('Failed to get data customer!');
  }

  try {
    const response = await axios.get(`${process.env.GENERAL_SERVICE_URL}menus/${data.menuId}`);
    menu = response.data.data;
  } catch (e) {
    console.log(
      `failed get data from ${process.env.GENERAL_SERVICE_URL}/menus/${data.menuId}: ` +
        e.message
    );
    throw new NotFoundError('Failed to get data menu!');
  }

  // store order
  const createdOrder = await repository.store(data);
  // send order to rabbitmq
  await publishOrder({
    orderId: createdOrder.id,
    customer: customer.username,
    menu: menu.name,
    price: menu.price,
  })

  return createdOrder
};

async function publishOrder(order) {
  try {
    const connection = await connect(process.env.AMQP_URI);
    const channel = await connection.createChannel();

    // Create or ensure the exchange exists
    const exchange = 'order_exchange';
    await channel.assertExchange(exchange, 'topic', { durable: true });

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
