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
