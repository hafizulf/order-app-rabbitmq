const repository = require('../repositories/payment.repository');
const axios = require('axios');
const NotFoundError = require('../exceptions/NotFoundError');
const BadRequestError = require('../../../general-service/src/exceptions/BadRequestError');

module.exports.storeOrderPayment = async function(order) {
  try {
    console.log('Adding payment record for order:', order);

    await repository.store({
      orderId: order.orderId,
      priceTotal: order.price
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports.updateStatusPayment = async function (id) {
  try {
    console.log('updating status payment');
    // check if payment exists
    const dataPayment = await repository.findById(id);

    // check if order exists
    let order;
    try {
      const response = await axios.get(
        `${process.env.ORDER_SERVICE_URL}orders/${dataPayment.orderId}`
      );
      order = response.data.data;
    } catch (e) {
      console.log(
        `failed get data from ${process.env.ORDER_SERVICE_URL}/orders/${dataPayment.orderId}: ` +
          e.message
      );
      throw new NotFoundError('Failed to get data menu!');
    }

    // check if order is paid
    if(dataPayment.paid) {
      throw new BadRequestError('Payment is already paid!');
    } else {
      // update payment status
      const updatedPayment = await repository.updatePaymentStatus(id);
      console.log('Payment status updated!');
      console.log(updatedPayment);
    }
  } catch (error) {
    throw(error);
  }
};
