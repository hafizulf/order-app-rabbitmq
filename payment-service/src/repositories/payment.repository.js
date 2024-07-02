const { Payment } = require('../models');
const NotFoundError = require('../exceptions/NotFoundError');
const { getCurrentDateUTC7 } = require('../libs/moment');

module.exports.store = async (data) => {
  const createdPayment = await Payment.create(data);
  return createdPayment;
}

module.exports.findById = async (id) => {
  const payment = await Payment.findByPk(id);

  if (!payment) {
    throw new NotFoundError('Payment not found');
  }

  return payment;
}

module.exports.updatePaymentStatus = async (id) => {
  const payment = await Payment.findByPk(id);

  if (!payment) {
    throw new NotFoundError('Payment not found');
  }

  payment.paid = true;
  payment.paidDatetime = getCurrentDateUTC7();
  await payment.save();

  return payment;
}
