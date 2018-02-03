var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
  var d = new Date();
  res.render('about', { year: d.getFullYear() });
});

module.exports = router;
