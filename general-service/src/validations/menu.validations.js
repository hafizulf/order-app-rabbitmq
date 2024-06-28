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

module.exports.getMenuValidator = [
  param('id')
    .notEmpty()
    .withMessage('Id is required')
    .isNumeric()
    .withMessage('Id must be a string'),
];

