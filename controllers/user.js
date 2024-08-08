const bcrypt = require('bcrypt');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const generateJwt = require('../utils/generateJwt');

// @desc Get All Users
// @route GET /api/v1/users
// @access Private
module.exports.getUsers = asyncHandler(async (req, res, next) => {
	const users = await User.find();

	return res.status(200).json({
		status: true,
		count: users.length,
		data: users,
	});
});

// @desc Create New User
// @route POST /api/v1/users
// @access Private
module.exports.createNewUser = asyncHandler(async (req, res, next) => {
	// hash user password

	req.body.password = await bcrypt.hash(req.body.password, 10);

	const user = await User.create(req.body);

	return res.status(201).json({
		status: true,
		data: user,
	});
});

// @desc Login
// @route POST /api/v1/users/login
// @access Public
module.exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorResponse('missing email or password', 400));
	}

	// find user

	const user = await User.findOne({ email });

	if (!user) {
		return next(new ErrorResponse('invalid email or password', 400));
	}

	if (!(await bcrypt.compare(password, user.password))) {
		return next(new ErrorResponse('invalid email or password', 400));
	}

	delete user._doc.password;

	return res.status(200).json({
		status: true,
		data: {
			access_token: generateJwt({ user_id: user._id }),
			user,
		},
	});
});

/**
 * @desc Update user
 * @route PUT /api/v1/users/:id
 * @access Private
 */
module.exports.updateUser = asyncHandler(async (req, res, next) => {
	const { id } = req.params;

	// find user
	const user = await User.findById(id);

	if (!user) {
		return next(new ErrorResponse(`No user found with id ${id}`, 400));
	}

	// hash new password
	if (req.body.password) {
		// compare old password
		if (!(await bcrypt.compare(req.body.oldPassword, user.password))) {
			return next(new ErrorResponse(`incorrect old password`, 400));
		}
		req.body.password = await bcrypt.hash(req.body.password, 10);
		delete req.body.oldPassword;
	}

	// update user
	const userUpdate = await User.findByIdAndUpdate(id, req.body, {
		runValidators: true,
	});

	return res.status(200).json({
		status: true,
		message: 'password update successful',
	});
});
