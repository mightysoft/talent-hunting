const express = require('express');
const jobController = require('../controllers/jobController');
const { auth, ensureEngineer, ensureRecruiter } = require('../middleware/auth');
const { route } = require('./userRoutes');
const router = express.Router();

router.use(auth);

// get-jobs, only for engineers
router.get('/all-jobs', ensureEngineer, jobController.getAllJobPost);

// create job post, only for recruiters
router.post('/create-job-post', ensureRecruiter, jobController.createJobPost);

// get a particular jon post
router.get('/get-job-post/:id', ensureRecruiter, jobController.getJobPost);

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
