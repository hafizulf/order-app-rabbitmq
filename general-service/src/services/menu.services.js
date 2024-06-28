const repository = require('../repositories/menu.repository');

module.exports.store = async (data) => {
  return (await repository.store(data));
};

module.exports.findById = async (id) => {
  const data = await repository.findById(id);
  return data;
};
