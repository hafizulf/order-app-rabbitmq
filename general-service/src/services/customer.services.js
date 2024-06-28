const BadRequestError = require('../exceptions/BadRequestError');
const repository = require('../repositories/customer.repository');

module.exports.store = async (data) => {
  const user = await repository.findByField({
    field: 'username',
    value: data.username
  })

  if (user) {
    throw new BadRequestError('Customer already exists');
  }

  return await repository.store(data);
};

module.exports.findById = async (id) => {
  const data = await repository.findById(id);
  return data;
}
