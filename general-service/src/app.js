const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { connect } = require('amqplib');

const errorHandler = require('./middlewares/errorHandler');

const indexRouter = require('./routes/index');
const menusRouter = require('./routes/menu.routes');
const customersRouter = require('./routes/customer.routes');

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
app.use('/api/menus', menusRouter);
app.use('/api/customers', customersRouter);

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

async function initializeGeneralService() {
  console.log('Initializing General Service consumer...');

  const connection = await connect(process.env.AMQP_URI);
  const channel = await connection.createChannel();

  // Define the existing exchange name and queue name
  const exchange = 'order_exchange';
  const queue = 'general_queue';

  // Assert the queue (creating it if it doesn't exist) and bind it to the existing exchange
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, 'order.created');

  // Consume messages from the queue
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const order = JSON.parse(msg.content.toString());
      console.log('General Service received order:', order);

      // Process the order...

      channel.ack(msg);
    }
  });

  console.log('General Service consumer is consuming messages');
}

initializeGeneralService();

module.exports = app;
