var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var passport = require('passport');
var auth = require('./modules/auth.js');

var env = process.env.NODE_ENV || 'development',
    config = require('./config/config.' + env);

var index = require('./routes/index');
var user = require('./routes/user');
var login = require('./routes/login');
var siteAdmin = require('./routes/siteAdmin');
var tools = require('./modules/tools');
var sessionManagement = require('./modules/sessionManagement');

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
app.set('config', config);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// session will not work for static content
app.set('trust proxy', 1) // trust first proxy
app.use(sessionManagement);
// passport initialization
auth.initializeStrategy(passport);
app.use(passport.initialize());
app.use(passport.session())
app.set('passport', passport);

//
// General toolset
//
// on request start and on request end moved after static content
app.use(tools.onRequestStart);
app.use(tools.onRequestEnd);
// generate menu of the application
app.use(tools.generateMainMenu);
app.use('/user', tools.generateUserMenu);

// authentication
app.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/user');
    });
app.get('/logout',
    function(req, res) {
        req.logout();
        res.redirect('/');
    });

//
// routing
//
app.use('/', index);
app.use('/user', function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login?m=not-logged-in');
    }
});
app.use('/user', function(req, res, next) {
    res.locals.layout = 'layout_user';
    next();
});
app.use('/user', user);
app.use('/siteAdmin', siteAdmin);
app.use('/login', login);

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
