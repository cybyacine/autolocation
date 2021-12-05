const express = require('express');
let router = express.Router();
let Interaction = require('../models/interaction');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
