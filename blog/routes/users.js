var express = require('express');
var router = express.Router();

/* GET users listing. */
index = router.get('/', function(req, res, next) {
  res.send('respond with a');
});

module.exports = router;
