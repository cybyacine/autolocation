let Comment = require("../models/comment");

async function findCommentsByPart(part) {
    const comments = await Comment.find({part: part}).populate('user');
    return comments;
}

module.exports = {
    findCommentsByPart
};
  