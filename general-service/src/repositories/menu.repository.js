const { Menu } = require('../models');

module.exports.store = async (props) => {
  const createdMenu = await Menu.create(props);
  return createdMenu;
};
