var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var viewData = {
        title: 'Main user page',
        userContents: 'This is main user page - it should use different layout',
    }
    res.render('userMain', viewData);
});

router.get('/address', function(req,res,next) {
    res.render('userAddress');
})

router.get('/billingInfo', function(req,res,next) {
    res.render('userBilling');
})

module.exports = router;
