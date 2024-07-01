const { Payment } = require('../models');

module.exports.store = async (data) => {
  const createdPayment = await Payment.create(data);
  return createdPayment;
}
