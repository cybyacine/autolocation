const express = require('express');
let router = express.Router();
let Car = require('../models/car');
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const cars = await Car.find({})
      .populate('brand');
  console.log(cars);
  //res.send('respond with a resource');
  res.render("ajoutAuto.twig");
});

module.exports = router;
