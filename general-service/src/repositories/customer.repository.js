const { Customer } = require('../models');
const BadRequestError = require('../exceptions/BadRequestError');

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
