const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { connect } = require('amqplib');

const errorHandler = require('./middlewares/errorHandler');

const indexRouter = require('./routes/index');
const ordersRouter = require('./routes/order.routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/orders', ordersRouter);

app.use(errorHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Initialize the order exchange
(async () => {
  try {
    const connection = await connect(process.env.AMQP_URI);
    const channel = await connection.createChannel();

    console.log("[Order Service] - Order exchange created");
    await channel.assertExchange('order_exchange', 'topic', { durable: true });

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
  }
})();

module.exports = app;
