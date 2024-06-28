const { Order } = require('../models');

module.exports.store = async (props) => {
  const createdOrder = await Order.create(props);
  return createdOrder;
};
