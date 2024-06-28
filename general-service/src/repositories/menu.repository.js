const { Menu } = require('../models');
const NotFoundError = require('../exceptions/NotFoundError');

module.exports.store = async (props) => {
  const createdMenu = await Menu.create(props);
  return createdMenu;
};

module.exports.findById = async (id) => {
  const data = await Menu.findByPk(id);

  if (!data) {
    throw new NotFoundError('Menu not found');
  }

  return data;
};
