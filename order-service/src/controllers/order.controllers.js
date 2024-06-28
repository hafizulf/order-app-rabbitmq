const service = require('../services/order.services');

module.exports.store = async (req, res, next) => {
  try {
    const data = await service.store(req.body);
    res.status(201).json({
      message: 'Order created successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
};
