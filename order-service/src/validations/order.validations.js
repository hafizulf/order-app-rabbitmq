const { body, param } = require('express-validator');

module.exports.createOrderValidator = [
  body('customerId')
    .notEmpty()
    .withMessage('Customer id is required')
    .isNumeric()
    .withMessage('Customer id must be a number'),
  body('menuId')
    .notEmpty()
    .withMessage('Menu id is required')
    .isNumeric()
    .withMessage('Menu id must be a number'),
];
