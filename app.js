var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var configDB = require('./config/config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var carsRouter = require('./routes/cars');
var brandsRouter = require('./routes/brands');
var commentsRouter = require('./routes/comments');
var interactionsRouter = require('./routes/interactions');
var sparePartsRouter = require('./routes/spare-parts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/brands', brandsRouter);
app.use('/cars', carsRouter);
app.use('/comments', commentsRouter);
app.use('/interactions', interactionsRouter);
app.use('/spareParts', sparePartsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

mongoose.connect(
    configDB.mongo.uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log("Connected to DB !!")
);

module.exports = app;
