const router = require('express').Router();
const authentication = require('../middleware/authenticate');

const {
	getBlogPosts,
	getBlogPost,
	createBlogPost,
	deleteBlogPost,
} = require('../controllers/blog');

router.route('/:id').get(getBlogPost).delete(authentication, deleteBlogPost);
router.route('/').get(getBlogPosts).post(authentication, createBlogPost);

module.exports = router;
