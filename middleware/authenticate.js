const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

module.exports = function (req, res, next) {
	const { authorization } = req.headers;

	if (!authorization) {
		return next(new ErrorResponse('unauthorized', 401));
	}

	const token = authorization.split(' ')[1];

	if (!token) {
		return next(new ErrorResponse('unauthorized', 401));
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
		if (err) {
			return next(new ErrorResponse(err.message, 401));
		}

		req.user_id = payload.user_id;
		next();
	});
};
