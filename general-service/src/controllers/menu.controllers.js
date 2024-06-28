const service = require('../services/menu.services');

module.exports.store = async (req, res) => {
  const data = await service.store(req.body);

  return res.status(201).json({
    message: 'Menu created successfully',
    data,
  });
};
