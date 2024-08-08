const router = require('express').Router();
const authentication = require('../middleware/authenticate');

const { getJobs, uploadNewJob, deleteJob } = require('../controllers/jobs');

router.route('/:id').delete(deleteJob);
router.route('/').get(getJobs).post(authentication, uploadNewJob);

module.exports = router;
