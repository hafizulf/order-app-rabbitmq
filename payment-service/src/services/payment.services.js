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

module.exports.findById = async function (id) {
  try {
    const dataPayment = await repository.findById(id);

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

    let customer;
    let menu;
    try {
      const response = await axios.get(
        `${process.env.GENERAL_SERVICE_URL}customers/${order.customerId}`
      );
      customer = response.data.data;
    } catch (e) {
      console.log(
        `failed get data from ${process.env.GENERAL_SERVICE_URL}/customers/${order.customerId}: ` +
          e.message
      );
      throw new NotFoundError('Failed to get data customer!');
    }

    try {
      const response = await axios.get(
        `${process.env.GENERAL_SERVICE_URL}menus/${order.menuId}`
      );
      menu = response.data.data;
    } catch (e) {
      console.log(
        `failed get data from ${process.env.GENERAL_SERVICE_URL}/menus/${order.menuId}: ` +
          e.message
      );
      throw new NotFoundError('Failed to get data menu!');
    }

    return {
      paymentId: dataPayment.id,
      orderId: dataPayment.orderId,
      customer: customer.username,
      menu: menu.name,
      priceTotal: `Rp. ${Number(dataPayment.priceTotal).toLocaleString('id-ID')},-`,
      paid: dataPayment.paid,
      paidDatetime: dataPayment.paidDatetime,
    };
  } catch (error) {
    throw(error);
  }
}
