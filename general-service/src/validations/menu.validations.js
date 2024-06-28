const { body, param } = require('express-validator');

module.exports.createMenuValidator = [
  body('type')
    .notEmpty()
    .withMessage('Type is required')
    .isString()
    .withMessage('Type must be a string'),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number'),
];
