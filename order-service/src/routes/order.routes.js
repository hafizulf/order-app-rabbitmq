var express = require('express');
var router = express.Router();
const {
  createOrderValidator,
} = require('../validations/order.validations');
const { validate } = require('../middlewares/validate');
const controller = require('../controllers/order.controllers');

router.post('/', createOrderValidator, validate, controller.store);

module.exports = router;
