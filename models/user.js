const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    full_name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['admin', 'guest'],
        default: 'guest',
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
})

userSchema.method({
    transform() {
        const transformed = {}
        const fields = ['email', 'full_name', 'age', 'phone', 'address', 'role']

        fields.forEach((field) => {
            transformed[field] = this[field]
        })

        return transformed
    }
});

const salt = bcrypt.genSaltSync(10);
// pre
userSchema.pre('save', function (next) {
    console.log('this');
    if (this.password) {
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
});


const User = mongoose.model('users', userSchema);

const password = bcrypt.hashSync('test123', salt);
const data = [{
    email: 'halim@gmail.com',
    full_name: 'halimjmila',
    password: password,
    age: 27,
    phone: '24788917',
    role: 'admin'
}];
User.collection.insertMany(data);

module.exports = User;
