const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sparePartSchema = new Schema({
    part: {
        type: String,
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cars'
    },
    price: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    qty: {
        type: Number,
        required: false
    },
    photos: [{
        type: String,
        required: false
    }]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
})

const SparePart = mongoose.model('spare-parts', sparePartSchema);

module.exports = SparePart;
