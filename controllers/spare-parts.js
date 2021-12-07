let SparePart = require('../models/spare-part');

async function allSpareParts() {
    const spareParts = await SparePart.find({});
    return spareParts;
}

async function addSpareParts(req, res, next) {
    try {
        const {
            name,
            car,
            price,
            category,
            qty
        } = req.body;

        const sparePart = new SparePart({name, car, price, category, qty, photos});
        await sparePart.save();

        return res.redirect('/spareParts');
    } catch (e) {
        console.error(e);
        return res.render('spare-parts/add.twig', {error: 'error or exist spare part'});
    }
}

module.exports = {
    allSpareParts,
    addSpareParts,
}
