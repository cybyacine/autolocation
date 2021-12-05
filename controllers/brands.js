let Brand = require('../models/brand');

async function allBrands(req, res, next) {
    const brands = await Brand.find({});
    return res.json(brands);
}

module.exports = {
    allBrands,
}
