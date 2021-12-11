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

async function deleteBrand(id) {
    Brand.deleteOne({_id: id},
        (err, user) => {
            if (err)
                return false
            return true;
        }
    );
}

async function findById(id) {
    return Brand.findById(id);
}

async function editBrands(req, res, next) {
    try {
        let logo = '';
        if (req.file) {
            console.log(req.file)
            logo = `/uploads/${req.file.filename}`;
        }
        const {
            name
        } = req.body;

        Brand.updateOne({_id: req.params.id},
            {
                $set: {
                    name,
                    logo,
                }
            }, {},
            (err, contact) => {
                return res.redirect('/brands');
            }
        );
    } catch (e) {
        console.error(e);
        return res.render('brands/add.twig', {error: 'error or exist brand'});
    }
}

module.exports = {
    allBrands,
    addBrands,
    deleteBrand,
    findById,
    editBrands,
}
