var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var viewData = {
        title: 'Main users page',
        userContents: 'This is main users page - it should use different layout',
        layout: 'layout_user'
    }
    res.render('userMain', viewData);
});

module.exports = router;
