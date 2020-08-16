const mongoose = require('mongoose');

const appliedSchema = new mongoose.Schema({
  candidate: {
    name: {
      type: String,
      required: [true, 'Applied must belong to a user (name).'],
    },

    email: {
      type: String,
      required: [true, 'Applied must belong to a user (email).'],
    },
    type: Object,
    ref: 'User',
    required: [true, 'Applied must belong to a user.'],
  },

  jobId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Job',
    required: [true, 'Applied must belong to a job.'],
  },

  candidateSkills: {
    type: Array,
    required: [true, 'User must have skills.'],
  },

  skillsPerc: {
    type: String,
    required: [true, 'Applied must have a skills perc.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Applied = mongoose.model('Applied', appliedSchema);
module.exports = Applied;
