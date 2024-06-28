const { body, param } = require('express-validator');

module.exports.createCustomerValidator = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .withMessage('Username must be a string'),
];

module.exports.getCustomerValidator = [
  param('id')
    .notEmpty()
    .withMessage('Id is required')
    .isNumeric()
    .withMessage('Id must be a string'),
];
