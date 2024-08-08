const BlogPost = require('../models/Blog');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get All Blog Posts
// @route     GET /api/v1/blogs
// @access    Public
module.exports.getBlogPosts = asyncHandler(async (req, res, next) => {
	// get blog posts from db
	const posts = await BlogPost.find().populate({
		path: 'author',
		select: 'firstName lastName email',
	});

	return res.status(200).json({
		status: true,
		count: posts.length,
		data: posts,
	});
});

// @desc      Get Single Blog Post
// @route     GET /api/v1/blogs/:id
// @access    Public
module.exports.getBlogPost = asyncHandler(async (req, res, next) => {
	// get blog post with id from db

	const { id } = req.params;

	if (!id) {
		return next(new ErrorResponse(`Invalid post id`, 400));
	}

	const post = await BlogPost.findById(id).populate({
		path: 'author',
		select: 'firstName lastName email',
	});

	if (!post) {
		return next(new ErrorResponse(`invalid post id`, 400));
	}

	return res.status(200).json({
		status: true,
		data: post,
	});
});

// @desc      Create New Blog Posts
// @route     POST /api/v1/blogs
// @access    Private
module.exports.createBlogPost = asyncHandler(async (req, res, next) => {
	// get blog posts from db

	const post = await BlogPost.create(req.body);

	return res.status(201).json({
		status: true,
		data: post,
	});
});

// @desc      Delete Blog Post
// @route     Delete /api/v1/blogs/:id
// @access    Private
module.exports.deleteBlogPost = asyncHandler(async (req, res, next) => {
	// get blog posts from db
	const { id } = req.params;

	if (!id) {
		return next(new ErrorResponse(`missing post id`, 400));
	}

	const post = await BlogPost.findById(id);

	if (!post) {
		return next(new ErrorResponse(`invalid post id`, 400));
	}

	post.remove();

	return res.status(200).json({
		status: true,
		data: {},
	});
});
