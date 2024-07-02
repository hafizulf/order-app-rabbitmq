var express = require('express');
var router = express.Router();
const {
  createOrderValidator,
  getOrderValidator,
} = require('../validations/order.validations');
const { validate } = require('../middlewares/validate');
const controller = require('../controllers/order.controllers');

router
  .post('/', createOrderValidator, validate, controller.store)
  .get('/:id', getOrderValidator, validate, controller.findById);

module.exports = router;
