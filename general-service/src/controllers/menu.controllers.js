const service = require('../services/menu.services');

module.exports.store = async (req, res) => {
  const data = await service.store(req.body);

  return res.status(201).json({
    message: 'Menu created successfully',
    data,
  });
};

module.exports.findById = async (req, res, next) => {
  try {
    const data = await service.findById(req.params.id);
    res.status(200).json({
      message: 'success',
      data,
    });
  } catch (err) {
    next(err);
  }
};
