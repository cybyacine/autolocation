let SparePart = require("../models/spare-part");
let Car = require("../models/car");
const fs = require("fs");
const path = require("path");

async function allSpareParts() {
  const spareParts = await SparePart.find({});
  return spareParts;
}

async function allCars() {
  const cars = await Car.find({});
  return cars;
}

async function addSpareParts(req, res, next) {
  try {
    const { part, car, price, category, qty } = req.body;

    const sparePart = new SparePart({ part, car, price, category, qty });
    await sparePart.save();

    return res.redirect("/spareParts");
  } catch (e) {
    console.error(e);
    return res.render("spare-parts/add.twig", {
      error: "error or exist spare part"
    });
  }
}

function getJsonSpareParts() {
  let rawdata = fs.readFileSync(path.resolve(__dirname + "/../public/jsons/", 'spare-parts-by-category.json'));
  return JSON.parse(rawdata);
}

module.exports = {
  allSpareParts,
  getJsonSpareParts,
  addSpareParts,
  allCars
};
