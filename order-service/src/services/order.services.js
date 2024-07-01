const axios = require('axios')
const NotFoundError = require('../exceptions/NotFoundError');
const repository = require('../repositories/order.repository');
const { publishOrder } = require('../rabbitmq/producer');

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
  // send order to rabbitmq exchange
  await publishOrder({
    orderId: createdOrder.id,
    customer: customer.username,
    menu: menu.name,
    price: menu.price,
  })

  return createdOrder
};
