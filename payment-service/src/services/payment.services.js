const repository = require('../repositories/payment.repository');

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
