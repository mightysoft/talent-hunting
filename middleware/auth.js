const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const AppError = require('../utils/appError');

exports.auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  // checking for token
  if (!token) return next(new AppError('No token, authorization denied', 401));

  try {
    // Varify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    // res.status(400).json({ msg: 'Token is not valid' });
    return next(new AppError('Token is not valid', 400));
  }
};

exports.ensureRecruiter = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (user.role === 'engineer') {
      return next(new AppError('You are not allowed!', 401));
    }

    next();
  } catch (error) {
    return next(new AppError('Someting went wrong!', 400));
  }
};

exports.ensureEngineer = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (user.role === 'recruiter') {
      return next(new AppError('You are not allowed!', 401));
    }

    next();
  } catch (error) {
    return next(new AppError('Someting went wrong!', 400));
  }
};
