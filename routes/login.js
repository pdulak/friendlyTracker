var express = require('express');
var router = express.Router();
var tools = require('./../modules/tools');

router.get('/', function(req, res, next) {
    var viewData = {
        title: 'Login page',
    }
    res.render('loginMain', viewData);
});



module.exports = router;
