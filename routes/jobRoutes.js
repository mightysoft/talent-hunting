const express = require('express');
const jobController = require('../controllers/jobController');
const { auth, ensureEngineer, ensureRecruiter } = require('../middleware/auth');
const router = express.Router();

router.get('/search-jobs/:searchTex', jobController.getJobsByName);
// get-jobs, only for engineers
router.get('/all-jobs', jobController.getAllJobPost);

// router.use();
// apply job, only for engineers/developer (jobId)
router.post('/apply-job',auth, ensureEngineer, jobController.applyJob);

// get applied data by jobId, only for recruiter
router.get(
  '/get-applied-data/:jobId',
  auth,
  ensureRecruiter,
  jobController.appliedData
);

// create job post, only for recruiters
router.post('/create-job-post',auth, ensureRecruiter, jobController.createJobPost);

// get a particular jon post!
router.get('/get-job-post/:id',auth, jobController.getJobPost);

// get posted jobs by recruiter id, only for recruiter
router.get(
  '/get-posted-jobs/:recruiterId',
  auth,
  ensureRecruiter,
  jobController.postedJobs
);

// update job post, only for recruiters
router.patch(
  '/update-job-post/:id',
  auth,
  ensureRecruiter,
  jobController.updateJobPost
);

// delete job post, only for reacuiters
router.delete(
  '/delete-job-post/:id',
  auth,
  ensureRecruiter,
  jobController.deleteJobPost
);

module.exports = router;
