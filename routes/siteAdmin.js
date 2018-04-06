var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

router.get('/', function(req, res, next) {
    var viewData = {
        title: 'Main admin page',
        adminContents: 'This is main admin page'
    }
    res.render('adminMain', viewData);
});

router.get('/setup', function(req, res, next) {
    var viewData = {
        title: 'Setup admin page'
    }
    res.render('adminSetup', viewData);
});

module.exports = router;
