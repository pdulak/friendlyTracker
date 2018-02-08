var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
router.get('/about', function(req, res, next) {
    var d = new Date();
    var viewData = {
        year: d.getFullYear(),
        testVariable: 'test value changed again'
    };
    res.render('about', viewData);
});

module.exports = router;
