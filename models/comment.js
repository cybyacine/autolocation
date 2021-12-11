const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    part: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parts'
    },
    pusher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    date_pushing: [{
        type: String
    }]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
})

const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;
