var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var siteAdmin = require('./routes/siteAdmin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('executionsThisTime',0);

app.use(function(req,res,next) {
    var executions = req.app.get('executionsThisTime');
    app.set('executionsThisTime',++executions);
    console.log('on Request Start?');
    next();
})

app.use(function (req, res, next) {
    function afterResponse() {
        var executions = req.app.get('executionsThisTime');
        res.removeListener('finish', afterResponse);
        res.removeListener('close', afterResponse);

        console.log('on Request End?');
        console.log('Executed ' + executions + ' times');
    }

    res.on('finish', afterResponse);
    res.on('close', afterResponse);

    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/siteAdmin', siteAdmin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
