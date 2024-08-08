// jshint esversion:8
const mongoose = require('mongoose');
const slugify = require('slugify');
const { Schema, model, Types } = mongoose;

const blogSchema = new Schema({
	title: { type: String, required: [1, 'A title is required'] },
	media: {
		type: String,
		enum: ['image', 'video'],
	},
	url: {
		type: String,
		match: [
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
			'invalid media url',
		],
	},
	post: { type: String, required: [1, 'Post content is required'] },
	createdAt: {
		type: Date,
		default: Date.now,
	},
	slug: String,
	author: {
		type: Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

blogSchema.pre('save', function (next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});

const BlogPost = model('blogPost', blogSchema);

module.exports = BlogPost;
