var express = require('express');
var router = express.Router();
var dbLayer = require('../modules/dbLayer');

router.get('/', function(req, res, next) {
    var User = dbLayer.user;
    User.findAll().then(function(users) {
        var viewData = {
            title: 'Main admin page',
            adminContents: 'This is main admin page',
            users: users,
        }
        res.render('adminMain', viewData);
    });
});

router.get('/setup', function(req, res, next) {
    var viewData = {
        title: 'Setup admin page'
    }
    res.render('adminSetup', viewData);
});

module.exports = router;
