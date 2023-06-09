var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { default: mongoose } = require('mongoose');

var indexRouter = require('./routes/index');

// var suppliersRouter = require('./routes/suppliers');
// var productsRouter = require('./routes/products');
// var categoriesRouter = require('./routes/categories');
// var employeesRouter = require('./routes/employees');
// var customersRouter = require('./routes/customers');
// var ordersRouter = require('./routes/orders');
// var productsFileRouter = require('./routes/products.file');

var questionsRouter = require('./routes/question/router');

var productsRouter = require('./routes/product/router');
var categoriesRouter = require('./routes/category/router');
var suppliersRouter = require('./routes/supplier/router');
var employeesRouter = require('./routes/employee/router');
var customersRouter = require('./routes/customer/router');
var ordersRouter = require('./routes/order/router');

const { CONNECTION_STRING } = require('./constants/dbSettings');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    cors({
        origin: '*',
    }),
);

mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_STRING);

app.use('/', indexRouter);
// app.use('/products', productsRouter);
app.use('/products', productsRouter);
app.use('/suppliers', suppliersRouter);
app.use('/categories', categoriesRouter);
app.use('/customers', customersRouter);
app.use('/employees', employeesRouter);
app.use('/orders', ordersRouter);
app.use('/questions', questionsRouter);
// app.use('/products-file', productsFileRouter);


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

module.exports = app;