const { contactSchema } = require('../utils/validationSchemas');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

module.exports = asyncHandler(async (req, res, next) => {
	if (req.method === 'POST' && req.originalUrl === '/api/v1/contact') {
		const isValid = await contactSchema.validateAsync(req.body);
		if (isValid) {
			return next();
		} else {
			// console.log(isValid);
			next(new ErrorResponse(`Invalid request body`), 400);
		}
	}
});
