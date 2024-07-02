const { Order } = require('../models');
const NotFoundError = require('../exceptions/NotFoundError');

module.exports.store = async (props) => {
  const createdOrder = await Order.create(props);
  return createdOrder;
};

module.exports.findById = async (id) => {
  const data = await Order.findByPk(id);

  if (!data) {
    throw new NotFoundError('Order not found');
  }

  return data;
};
