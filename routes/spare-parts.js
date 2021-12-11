const express = require("express");
let router = express.Router();
let SparePart = require("../models/spare-part");
const SparePartController = require("../controllers/spare-parts");
const CommentController = require("../controllers/comments");
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

// /* redirect to default */
// router.get("/**", async function(req, res, next) {
//   res.redirect("/spareParts/backOffice/");
// });

/* GET spare-parts listing. */
router.get("/", async function(req, res, next) {
  let spareParts = await SparePartController.allSpareParts();
  res.render("spare-parts/index", { spareParts });
});

/* GET spare-part details by id. */
router.get("/details/:id", async function(req, res, next) {
  let sparePart = await SparePartController.findSparePartById(req.params.id);
  let comments = await CommentController.findCommentsByPart(req.params.id);
  res.render("spare-parts/details", { sparePart, comments });
});

/* POST spare-parts search */
router.post("/search/", async function(req, res, next) {
  let spareParts = await SparePartController.searchByCreteria(req, res, next);
   res.render("spare-parts/index", { spareParts });
});

/* GET spare-parts listing in back-office. */
router.get("/backOffice/", async function(req, res, next) {
    let spareParts = await SparePartController.allSpareParts();
    res.render("spare-parts/back-office/index", { spareParts });
});

/* GET spare-part details by id in back-office. */
router.get("/backOffice/details/:id", async function(req, res, next) {
  let sparePart = await SparePartController.findSparePartById(req.params.id);
  res.render("spare-parts/back-office/details", { sparePart });
});

/* POST spare-part delete by id. */
router.post("/backOffice/delete/:id", async function(req, res, next) {
  await SparePartController.deleteSparePart(req, res, next);
  res.redirect("/spareParts/backOffice/");
});

/* GET spare-part edit by id. */
router.get("/backOffice/edit/:id", async function(req, res, next) {
  let sparePart = await SparePartController.findSparePartById(req.params.id);
  res.render("spare-parts/back-office/edit", { sparePart });
});

router.post("/backOffice/edit/:id", async function(req, res, next) {
  await SparePartController.editSparePart(req, res, next);
  res.render("spare-parts/back-office/details");
});

/* GET spare-part add. */
router.get("/backOffice/add", async function(req, res, next) {
  let parts = SparePartController.getJsonSpareParts();
  let cars = await SparePartController.allCars();
  res.render("spare-parts/back-office/add", { parts, cars });
});

/* POST spare-part. */
router.post("/backOffice/add", upload.array("photos"), async function(req, res, next) {
  return await SparePartController.addSparePart(req, res, next);
});

/* GET spare-part edit by id. */
router.get("/backOffice/edit/:id", async function(req, res, next) {
  let sparePart = await SparePartController.findSparePartById(req.params.id);
  res.render("spare-parts/back-office/edit", { sparePart });
});

module.exports = router;
