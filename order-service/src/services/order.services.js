const axios = require('axios')
const NotFoundError = require('../exceptions/NotFoundError');
const repository = require('../repositories/order.repository');

module.exports.store = async (data) => {
  // checking customer and menu from general service
  try {
    await axios.get(`${process.env.GENERAL_SERVICE_URL}customers/${data.customerId}`);
  } catch (e) {
    console.log(
      `failed get data from ${process.env.GENERAL_SERVICE_URL}/customers/${data.customerId}: ` +
        e.message
    );
    throw new NotFoundError('Failed to get data customer!');
  }

  try {
    await axios.get(`${process.env.GENERAL_SERVICE_URL}menus/${data.menuId}`);
  } catch (e) {
    console.log(
      `failed get data from ${process.env.GENERAL_SERVICE_URL}/menus/${data.menuId}: ` +
        e.message
    );
    throw new NotFoundError('Failed to get data menu!');
  }

  // store order
  return await repository.store(data);
};
