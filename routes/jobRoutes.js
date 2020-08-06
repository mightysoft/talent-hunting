const express = require('express');
const jobController = require('../controllers/jobController');
const { auth, ensureEngineer, ensureRecruiter } = require('../middleware/auth');
const router = express.Router();

router.use(auth);

// get-jobs, only for engineers
router.get('/all-jobs', jobController.getAllJobPost);

// apply job, only for engineers/developer (jobId)
router.post('/apply-job', ensureEngineer, jobController.applyJob);

// get applied data by jobId, only for recruiter
router.get('/get-applied-data/:jobId', ensureRecruiter, jobController.appliedData)

// create job post, only for recruiters
router.post('/create-job-post', ensureRecruiter, jobController.createJobPost);

// get a particular jon post!
router.get('/get-job-post/:id', jobController.getJobPost);

// get posted jobs by recruiter id, only for recruiter
router.get('/get-posted-jobs/:recruiterId', ensureRecruiter, jobController.postedJobs)

// update job post, only for recruiters
router.patch(
  '/update-job-post/:id',
  ensureRecruiter,
  jobController.updateJobPost
);

// delete job post, only for reacuiters
router.delete(
  '/delete-job-post/:id',
  ensureRecruiter,
  jobController.deleteJobPost
);

module.exports = router;
