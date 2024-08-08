const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
	firstName: {
		type: String,
		maxlength: [50, 'maxlength exceeded for firstname'],
		trim: true,
		required: [1, 'First name is required'],
	},
	lastName: {
		type: String,
		maxlength: [50, 'maxlength exceeded for lastname'],
		trim: true,
		required: [1, 'Last name is required'],
	},
	email: {
		type: String,
		match: [
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Invalid email address',
		],
		trim: true,
		required: [1, 'Email is required'],
	},
	password: {
		type: String,
		trim: true,
		required: [1, 'Password is required'],
	},
});

module.exports = model('User', userSchema);
