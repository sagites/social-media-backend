const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Job = require('../models/Job');

/**
 * @desc Get all jobs
 * @route GET /api/v1/jobs/
 * @access Public
 */
module.exports.getJobs = asyncHandler(async (req, res, next) => {
	// save data to db
	const jobs = await Job.find();

	return res.status(200).json({
		status: true,
		count: jobs.length,
		data: jobs,
	});
});

/**
 * @desc Upload new job
 * @route POST /api/v1/jobs/
 * @access Private
 */
module.exports.uploadNewJob = asyncHandler(async (req, res, next) => {
	// save data to db

	const job = await Job.create(req.body);

	return res.status(201).json({
		status: true,
		data: job,
	});
});

/**
 * @desc Delete job
 * @route DELETE /api/v1/jobs/:id
 * @access Private
 */
module.exports.deleteJob = asyncHandler(async (req, res, next) => {
	// find job and delete
	const { id } = req.params;
	const job = await Job.findByIdAndDelete(id);

	if (!job) {
		const error = new ErrorResponse(`Invalid job id`, 400);
		return next(error);
	}

	return res.status(201).json({
		status: true,
		data: {},
	});
});
