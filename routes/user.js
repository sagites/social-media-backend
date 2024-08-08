const router = require('express').Router();
const authentication = require('../middleware/authenticate');

const {
	createNewUser,
	getUsers,
	login,
	updateUser,
} = require('../controllers/user');

router.route('/:id').put(authentication, updateUser);
router.route('/').post(authentication, createNewUser);
router.route('/login').post(login);

module.exports = router;
