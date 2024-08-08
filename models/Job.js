// jshint esversion:8
const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const jobSchema = new Schema({
	mediaType: {
		type: String,
		enum: ['image', 'video'],
		required: [1, 'media type is required'],
	},
	url: {
		type: String,
		match: [
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
			'invalid media url format',
		],
		required: [1, 'media url is required'],
	},
	uploadedAt: {
		type: Date,
		default: Date.now,
	},
	uploadedBy: {
		type: Types.ObjectId,
		ref: 'User',
		required: [1, 'user id is required'],
	},
});

module.exports = model('Job', jobSchema);
