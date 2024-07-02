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
