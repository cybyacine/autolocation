const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    logo: {
        type: String,
        required: false
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
})

const Brand = mongoose.model('brands', brandSchema);

// const data = [{
//     name: 'BMW',
// },{
//     name: 'AUDI',
// }];
// Brand.collection.insertMany(data);

module.exports = Brand;
