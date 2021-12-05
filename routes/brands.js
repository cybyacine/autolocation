const express = require('express');
const router = express.Router();
let Brand = require('../models/brand');
const brandController = require('../controllers/brands')
/* GET users listing. */
router.get('/', function (req, res, next) {
    return brandController.allBrands(req, res, next);
});

module.exports = router;
