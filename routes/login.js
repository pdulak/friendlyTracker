var express = require('express');
var router = express.Router();
var auth = require('./../modules/auth');

router.get('/', function(req, res, next) {
    var viewData = {
        title: 'Login page',
    }
    res.render('loginMain', viewData);
});

// router.post('/', function(req, res, next) {
//     var passport = req.app.get('passport');
//     passport.authenticate('local', { failureRedirect: '/login?f=1', successRedirect: '/dashboard' });
// });

router.post('/signup', function(req, res, next) {
    auth.createUser(req, res, function(data) {
        var viewData = {
            title: 'Signup page',
            message: data.message,
        }
        res.render('loginSignup', viewData);
    });
});

module.exports = router;
