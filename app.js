var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var hbs = require('hbs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var env = process.env.NODE_ENV || 'dev'
  , config = require('./config/config.'+env);

var index = require('./routes/index');
var user = require('./routes/user');
var siteAdmin = require('./routes/siteAdmin');
var tools = require('./modules/tools');

var app = express();

//
// Handlebars / HBS setup and configuration
//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// partials will be stored in /views/partials
hbs.registerPartials(__dirname + '/views/partials');
// expose response locals and app locals to the templating system
hbs.localsAsTemplateData(app);

//
// App level variables initialization
//
// value to play with on request start and end
app.set('executionsThisTime', 0);
app.set('config',config)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
// General toolset
//
// on request start and on request end moved after static content
app.use(tools.onRequestStart);
app.use(tools.onRequestEnd);
// generate menu of the application
app.use(tools.generateMainMenu);
app.use('/user', tools.generateUserMenu);

//
// routing
//
app.use('/', index);
app.use('/user', function(req, res, next) {
    res.locals.layout = 'layout_user';
    next();
});
app.use('/user', user);
app.use('/siteAdmin', siteAdmin);

//
// error handling
//
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
