const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
	postId: { type: String, required: [1, 'Post id is required!'] },
	name: { type: String, required: [1, 'Name is required'] },
	email: { type: String, required: [1, 'Email is required'] },
	comment: { type: String, required: [1, 'Comment is required'] },
	createdAt: { type: Date, default: Date.now },
});

const Comment = model('comment', commentSchema);

module.exports = Comment;
