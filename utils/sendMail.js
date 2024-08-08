const mailgun = require('mailgun-js')({
	apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN,
	host: process.env.MAILGUN_REGION,
});

class SendMail {
	constructor(data) {
		this.data = data;
	}

	send() {
		return mailgun.messages().send(this.data);
	}
}

module.exports = SendMail;
