const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interactionSchema = new Schema({
    type: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cars'
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});

const Interaction = mongoose.model('interactions', interactionSchema);

module.exports = Interaction;
