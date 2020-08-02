const Job = require('../models/JobModel');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllJobPost = factory.getAll(Job);

exports.createJobPost = factory.createOne(Job);
exports.getJobPost = factory.getOne(Job);
exports.updateJobPost = factory.updateOne(Job);
exports.deleteJobPost = factory.deleteOne(Job);
