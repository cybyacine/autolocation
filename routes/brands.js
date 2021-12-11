const express = require('express');
const router = express.Router();
let Brand = require('../models/brand');
const brandController = require('../controllers/brands')
const multer = require('multer')
const isAuth = require("../config/isAuth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-';
        cb(null, uniqueSuffix + file.originalname);
    }
})

const upload = multer({storage: storage})

/* GET users listing. */
router.get('/', isAuth, async function (req, res, next) {
    let brands = await brandController.allBrands();
    res.render('brands/index', {brands});
});
router.get('/add', function (req, res, next) {
    // return brandController.allBrands(req, res, next);
    res.render('brands/add');
});

router.post('/add', upload.single('logo'), async function (req, res, next) {
    return await brandController.addBrands(req, res, next);
});

router.post('/delete/:id', async function (req, res, next) {
    await brandController.deleteBrand(req.params.id);
    res.redirect('/brands');
});

router.get('/edit/:id', async function (req, res, next) {
    const brand = await brandController.findById(req.params.id);
    res.render('brands/edit', {brand});
});

router.post('/edit/:id', upload.single('logo'), async function (req, res, next) {
    return await brandController.editBrands(req, res, next);
});

module.exports = router;
