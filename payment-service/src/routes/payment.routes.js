const express = require('express');
const router = express.Router();

const {
  updatePaymentValidator,
  getPaymentValidator,
} = require('../validations/payment.validations');
const { validate } = require('../middlewares/validate');
const controller = require('../controllers/payment.controllers');

router.put(
    '/:id',
    updatePaymentValidator,
    validate,
    controller.updateStatusPayment
  )
  .get('/:id', getPaymentValidator, validate, controller.findById)
;

module.exports = router;
