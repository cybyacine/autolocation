const express = require("express");
let router = express.Router();
let SparePart = require("../models/spare-part");
const SparePartController = require("../controllers/spare-parts");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-";
    cb(null, uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage: storage });

/* GET spare-parts listing. */
router.get("/", async function(req, res, next) {
    let spareParts = await SparePartController.allSpareParts();
    res.render("spare-parts/index", { spareParts });
});

router.get("/add", async function(req, res, next) {
  let parts = SparePartController.getJsonSpareParts();
  let cars = await SparePartController.allCars();
  console.log(cars);
  res.render("spare-parts/add", { parts, cars });
});

router.post("/add", upload.single("logo"), async function(req, res, next) {
  return await SparePartController.addSpareParts(req, res, next);
});

module.exports = router;
