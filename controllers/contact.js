const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const SendMail = require('../utils/sendMail');

/**
 * @desc Handle Contact Form
 * @route POST /api/v1/contact
 * @access Public
 */
module.exports.handleContact = asyncHandler(async (req, res, next) => {
	const data = {
		from: req.body.email,
		to: process.env.COMPANY_EMAIL,
		subject: req.body.topic,
		text: req.body.message,
	};

	const mailInstance = new SendMail(data);
	const mailSent = await mailInstance.send();
	console.log(mailSent);
	if (mailSent.id) {
		return res.status(200).json({
			status: true,
			data: mailSent,
		});
	} else {
		next(new ErrorResponse('Error sending mail', 500));
	}
});
