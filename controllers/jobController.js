const Job = require('../models/JobModel');
const Applied = require('../models/AppliedModel');
const User = require('../models/UserModel');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllJobPost = factory.getAll(Job);

exports.createJobPost = factory.createOne(Job);
exports.getJobPost = factory.getOne(Job);
exports.updateJobPost = factory.updateOne(Job);
exports.deleteJobPost = factory.deleteOne(Job);

// get posted jobs by recruiter id
exports.postedJobs = catchAsync(async (req, res, next) => {
  const recruiterId = req.params.recruiterId;

  const recruiter = await User.findOne({ _id: recruiterId, role: 'recruiter' }); // reId: 5f18444541ac0642a3f9b190

  if (!recruiter)
    return next(new AppError('No recruiter found with that id', 404));

  const jobs = await Job.find({ recId: recruiterId }).sort({ createdAt: -1 });

  if (jobs.length === 0)
    return next(new AppError('No job posts found with that recruiter id', 404));

  return res.status(200).json(jobs);
});

// apply job
exports.applyJob = catchAsync(async (req, res, next) => {
  const { user, jobId, skills } = req.body;
  let count = 0;

  const userData = await User.findOne({ email: user.email });

  const job = await Job.findById(jobId);

  if (!userData) return next(new AppError('No user found with that id', 404));

  if (!job) return next(new AppError('No job found with that id', 404));

  // split array by ',' then map through it for trim and to lower case every element
  const jobSkills = job.skills.split(',').map(el => el.trim().toLowerCase());

  // split array by ',' then map through it for trim and to lower case every element
  const sskills = skills.split(',').map(el => el.trim().toLowerCase());

  //   separate unique elements from prev skills
  const uniqueSkills = sskills.filter((item, pos) => {
    return sskills.indexOf(item) == pos;
  });

  uniqueSkills.forEach(el => {
    if (jobSkills.includes(el)) {
      count++;
    }
  });

  const skillsPerc = (count / jobSkills.length) * 100;

  const applied = await Applied.create({
    user: { name: user.name, email: user.email },
    jobId,
    userSkills: uniqueSkills,
    skillsPerc,
  });

  if (!applied)
    return next(
      new AppError('Something wrong to save applied data. Try again!', 404)
    );

  return res.status(201).json(applied);
});

// get applied data
// apply job
exports.appliedData = catchAsync(async (req, res, next) => {
  const jobId = req.params.jobId;

  const job = await Job.findById(jobId);

  if (!job) return next(new AppError('No job found with that id', 404));

  const data = await Applied.find({ jobId });

  if (!data)
    return next(new AppError('No applied data found with that id', 404));

  return res.status(200).json({
    status: 'success',
    results: data.length,
    data,
  });
});

// const jobs = await Job.find({ location: { $regex: name, $options: 'i' } });
// const jobs = await Job.find({ $text: { $search: "developer" } });
exports.searchJobs = catchAsync(async (req, res, next) => {
  const searchTex = req.params.searchTex;

  const jobs = await Job.find({
    $or: [
      { title: { $regex: searchTex, $options: 'i' } },
      { company: { $regex: searchTex, $options: 'i' } },
      { type: { $regex: searchTex, $options: 'i' } },
      { location: { $regex: searchTex, $options: 'i' } },
    ],
  }).sort({ createdAt: -1 });

  if (jobs.length === 0)
    return res.status(404).json({
      status: 'fail',
      results: jobs.length,
      message: 'No jobs found with that search text. Try differen! ☹',
    });

  res.status(200).json({
    status: 'success',
    results: jobs.length,
    jobs,
  });
});
