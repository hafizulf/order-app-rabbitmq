const { Customer } = require('../models');
const NotFoundError = require('../exceptions/NotFoundError');

module.exports.findByField = async ({
  field,
  value
}) => {
  const data = await Customer.findOne({
    where: {
      [field]: value
    }
  })

  return data;
};

module.exports.store = async (props) => {
  const createdCustomer = await Customer.create(props);
  return createdCustomer;
};

module.exports.findById = async (id) => {
  const data = await Customer.findByPk(id);

  if (!data) {
    throw new NotFoundError('Customer not found');
  }

  return data;
};
