const Joi = require('joi');

// contact validation schema
const contactSchema = Joi.object({
	name: Joi.string().max(50).min(3).required(),
	email: Joi.string().email().required(),
	company_name: Joi.string().max(50),
	topic: Joi.string().max(20).required(),
	message: Joi.string().max(500).required(),
});

module.exports = {
	contactSchema,
};
