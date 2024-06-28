const repository = require('../repositories/menu.repository');

module.exports.store = async (data) => {
  return (await repository.store(data));
};
