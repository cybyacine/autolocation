const express = require('express');
let router = express.Router();
let Car = require('../models/car');
let Brand = require('../models/brand');
let Interaction = require('../models/interaction');
const mongoose = require('mongoose');
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const cars = await Car.find({})
      .populate('brand');
  console.log(cars);
 // res.json(cars);
 res.render('cars/index.twig', {cars});
 //res.render("cars/index.twig");
});

router.post('/addCars', function(req, res, next){
  var car = new Car(
      {
      registered: req.body.registered,
      color : req.body.color,
     // brand : req.body.brand,
      name : req.body.name,
      photos : req.body.photos,
      price : req.body.price
  }
  )
  car.save();
 // res.render("cars/index.twig");
 res.redirect("/cars/");
})
router.get('/delete/:id', function(req, res, next){
  var id = req.params.id;
  Car.findOneAndRemove({_id:id}, function(err){
      if(err) throw err;
  })
  res.redirect("/cars/");
})
router.get('/add', function(req, res, next){
 
  res.render("cars/addCars.twig");
})
router.get('/update/:id', function(req, res, next){
  var id = req.params.id;
  Car.findById({_id:id}, function(err, data){
      
      if(err) throw err;
      console.log(data);
      res.render('cars/editCars.twig', {data});

})
})

router.post('/update', function(req, res, next){
  var id = req.body.id;
  Car.findById({ _id: id }, function (err, doc){
      doc.registered = req.body.registered;
      doc.color = req.body.color;
      doc.name = req.body.name;
      doc.price = req.body.price;
      doc.save();
      console.log(doc);
    });
  res.redirect("/cars/");
})
router.get('/recherche', async function(req, res, next) {
  const cars = await Car.find({})
      .populate('brand');
  console.log(cars);
 // res.json(cars);
 res.render('cars/listCars.twig', {cars});
 //res.render("cars/index.twig");
});

router.post('/rechercher', function(req, res, next){
  var name = req.body.name;
  var color = req.body.color;
  console.log(name);
  Car.find({ name: name ,color: color}, function (err, cars){
      console.log(cars);
     // res.json(cars);
     res.render('cars/listCars.twig', {cars});
    });
})
router.get('/listB', function(req, res, next) {

  Brand.find(function(err, data)
  {
      if(err) throw err;
     //res.json(data);
    res.render('cars/addCars.twig', {data});
  });
});
router.post('/like/:id', function(req, res, next){
  var id = req.params.id;
  var inter = new Interaction(
      {
      type: 'like',
      user :mongoose.Types.ObjectId("61acdee3e6e70a6f4f641d28"),
      car : mongoose.Types.ObjectId(id)

  }
  )
  inter.save();
 //res.redirect("cars/listCars.twig");
})
module.exports = router;
