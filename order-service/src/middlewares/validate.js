const { validationResult } = require('express-validator');
const { formatValidationErrors } = require('../utils/formatValidationErrors');

module.exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation error',
      errors: formatValidationErrors(errors.array()),
    });
  }

  next();
};
