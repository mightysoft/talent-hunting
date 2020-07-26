const JobPost = require('../models/JobPostModel');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');


exports.getAllJobPost = factory.getAll(JobPost);

exports.getCreateJobPost = factory.createOne(JobPost);
exports.getJobPost = factory.getOne(JobPost);
exports.getUpdateJobPost = factory.updateOne(JobPost);
exports.getDeleteJobPost = factory.deleteOne(JobPost);