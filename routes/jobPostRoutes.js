const express = require('express');
const jobPostController = require('../controllers/jobPostController');
const auth = require('../middleware/auth');
const router = express.Router();

//TODO:Token error output: Token is not valid / but token is valid. When i use this middleware , this middleware doesn't find accurate token.
router.use(auth);

router
    .route('/')
    .get(jobPostController.getAllJobPost)
    .post(jobPostController.getCreateJobPost);

router
    .route('/:id')
    .get(jobPostController.getJobPost)
    .patch(jobPostController.getUpdateJobPost)
    .delete(jobPostController.getDeleteJobPost);

module.exports = router;