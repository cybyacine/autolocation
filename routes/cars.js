const express = require('express');
let router = express.Router();
let Car = require('../models/car');
let Brand = require('../models/brand');
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
router.get('/recherche', function(req, res, next){
 
  res.render("listAnnonce.twig");
})
router.post('/rechercher', function(req, res, next){
  var marque = req.body.marque;
  var couleur = req.body.couleur;
  console.log(marque);
  Automobile.find({ marque: marque ,couleur: couleur}, function (err, data){
      console.log(data);
      //res.json(data);
      res.render('listAnnonce.twig', {data});
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
module.exports = router;
