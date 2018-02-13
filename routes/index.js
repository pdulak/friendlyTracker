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
        testVariable: 'User Agent: ' + req.headers['user-agent'],
        title: 'About us page'
    };
    req.zzzpdulakData = {
        testValue : true,
        testVal : false,
    }
    // console.log(req);
    res.render('about', viewData);
    // console.log(res);
});

module.exports = router;
