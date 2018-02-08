var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('This will handle Admin interface');
});

router.get('/thisIsNotWorking', function(req, res, next) {
    var a;
    a = b;
    res.send('This should not work');
});

module.exports = router;
