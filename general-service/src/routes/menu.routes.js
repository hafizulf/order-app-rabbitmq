var express = require('express');
var router = express.Router();
const { createMenuValidator } = require('../validations/menu.validations');
const { validate } = require('../middlewares/validate');
const controller = require('../controllers/menu.controllers');

router
  .post(
    '/',
    createMenuValidator,
    validate,
    controller.store,
  )

module.exports = router;
