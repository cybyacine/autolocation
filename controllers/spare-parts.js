let SparePart = require("../models/spare-part");
let Comment = require("../models/comment");
let Car = require("../models/car");
const fs = require("fs");
const path = require("path");

async function allSpareParts() {
  const spareParts = await SparePart.find({});
  return spareParts;
}

async function findSparePartById(id) {
  const sparePart = await SparePart.findById(id).populate({
      path: 'car', 
      populate: {
        path: 'brand'
      }
    });
  return sparePart;
}

async function allCars() {
  const cars = await Car.find({}).populate('brand');
  return cars;
}

async function addSparePart(req, res, next) {
  try {
    const { part, car, price, category, qty } = req.body;
    let photos;
    if (req.files)
      photos = Object.values(req.files).map(file => `/uploads/${file.filename}`);
    const sparePart = new SparePart({ part, car, price, category, qty, photos });
    await sparePart.save();
    return res.redirect("/spareParts/backOffice");
  } catch (e) {
    console.error(e);
    return res.render("spare-parts/add.twig", {
      error: "error or exist spare part"
    });
  }
}

async function editSparePart(req, res, next) {
  try {
    let sparePart = await SparePart.findById(req.params.id).populate('car');
    sparePart.price = req.body.price;
    sparePart.qty = req.body.qty;
    await sparePart.save();
    return res.redirect("/spareParts/backOffice/details/" + req.params.id);
  } catch (e) {
    console.error(e);
    return res.render("spare-parts/edit.twig", {
      error: "error spare part"
    });
  }
}

async function deleteSparePart(req, res, next) {
  return await SparePart.findByIdAndDelete(req.params.id);
}

function getJsonSpareParts() {
  let rawdata = fs.readFileSync(path.resolve(__dirname + "/../public/jsons/", 'spare-parts-by-category.json'));
  return JSON.parse(rawdata);
}

module.exports = {
  getJsonSpareParts,
  addSparePart,
  editSparePart,
  deleteSparePart,
  findSparePartById,
  allSpareParts,
  allCars
};
