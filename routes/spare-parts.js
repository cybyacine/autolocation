const express = require('express');
let router = express.Router();
let SparePart = require('../models/spare-part');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
