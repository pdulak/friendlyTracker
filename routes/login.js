var express = require('express');
var router = express.Router();
var auth = require('./../modules/auth');

router.get('/', function(req, res, next) {
    var viewData = {
        title: 'Login page',
    }
    res.render('loginMain', viewData);
});

router.post('/signup', function(req, res, next){
    console.log('--------------------------------------');
    console.log(req.body);
    auth.createUser(req,res,function(data){
        var viewData = {
            title: 'Signup page',
            message: data.message,
        }
        console.log('Result: ');
        console.log(data);
        res.render('loginSignup', viewData);
    });
});

module.exports = router;
