const service = require('../services/customer.services');

module.exports.store = async (req, res, next) => {
  try {
    const data = await service.store(req.body);
    res.status(201).json({
      message: 'Customer created successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
};
