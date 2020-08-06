const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  recId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Job post must be belong to a reacuiter.'],
  },
  type: {
    type: String,
    required: [true, 'A job post have a type!'],
    enum: {
      values: [
        'Full Time',
        'Part Time',
        'Part Time/Full Time',
        'Full Time/Part Time',
      ],
      message: 'Type either : Full Time,Part Time',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: String,
    required: [true, 'A job post have a company!'],
  },
  location: {
    type: String,
    required: [true, 'A job post have a location!'],
  },
  title: {
    type: String,
    required: [true, 'Job must have a title.'],
  },
  description: {
    type: String,
    required: [true, 'Job must have a description.'],
  },
  skills: {
    type: String,
    required: [true, 'Job must needs skills.'],
  },
});

const Job = mongoose.model('Jobs', jobSchema);
module.exports = Job;

// Appled : number
