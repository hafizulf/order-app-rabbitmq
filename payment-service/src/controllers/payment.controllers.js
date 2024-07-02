const service = require('../services/payment.services');

module.exports.updateStatusPayment = async (req, res, next) => {
  try {
    const data = await service.updateStatusPayment(req.params.id);

    res.status(200).json({
      message: 'Payment updated successfully',
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
      message: 'Payment fetched successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
};
