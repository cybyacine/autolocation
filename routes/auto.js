var express = require('express');
//const contact = require('../models/contact');
var router = express.Router();
//var Contact = require('../models/auto');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("listVoiture.twig");
});

module.exports = router;