var express = require('express');
var router = express.Router();
var tools = require('./../modules/tools');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var viewData = {
        title: 'Main user page',
        userContents: 'This is main user page - it should use different layout',
        startDate: tools.convertMillisecondsToStringDate(req.session.startDate),
        endDate: tools.convertMillisecondsToStringDate(req.session.lastRequestDate),
    }
    res.render('userMain', viewData);
});

module.exports = router;
