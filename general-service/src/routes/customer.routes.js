var express = require('express');
var router = express.Router();
const { createCustomerValidator } = require('../validations/customer.validations');
const { validate } = require('../middlewares/validate');
const controller = require('../controllers/customer.controllers');

router
  .post(
    '/',
    createCustomerValidator,
    validate,
    controller.store,
  )

module.exports = router;
