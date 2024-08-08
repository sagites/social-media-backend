const router = require('express').Router();
const validate = require('../middleware/validate');

const { handleContact } = require('../controllers/contact');

router.route('/').post(validate, handleContact);

module.exports = router;
