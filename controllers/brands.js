let Brand = require('../models/brand');

async function allBrands() {
    const brands = await Brand.find({});
    return brands;
}

async function addBrands(req, res, next) {
    try {
        let logo = '';
        if (req.file) {
            console.log(req.file)
            logo = `/uploads/${req.file.filename}`;
        }
        const {
            name
        } = req.body;

        const brand = new Brand({name, logo});
        await brand.save();

        return res.redirect('/brands');
    } catch (e) {
        console.error(e);
        return res.render('brands/add.twig', {error: 'error or exist brand'});
    }
}

module.exports = {
    allBrands,
    addBrands,
}
