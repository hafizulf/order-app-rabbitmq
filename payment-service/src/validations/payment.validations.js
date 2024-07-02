const { param } = require('express-validator');

module.exports.updatePaymentValidator = [
  param('id')
    .notEmpty()
    .withMessage('Payment id is required')
    .isNumeric()
    .withMessage('Payment id must be a number'),
];
