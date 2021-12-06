const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    registered: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: false
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brands'
    },
    color: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    qty: {
        type: Number,
        required: false
    },
    photos: [{
        type: String
    }]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
})

const Car = mongoose.model('cars', carSchema);
// const data = [{
//    registered: '123',
//   color: 'red',
//     price : '124',
//     brand: {name: 'BMW'}
// },{
//    registered: '123',
//    name: 'BMW',
//    color: 'red',
//    price : '124',

 //}];
// Car.collection.insertMany(data);
module.exports = Car;
