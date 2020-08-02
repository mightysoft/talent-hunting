const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');
const User = require('../models/UserModel');
const { auth } = require('../middleware/auth');

// @route POST api/auth
// @desc Auth users
// @access Public
router.post('/', (req, res, next) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return next(new AppError('Please enter all fields 🙂', 400));
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return next(new AppError('User Does not exist', 400));

    //   Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return next(new AppError('Invalid credentials', 400));

      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          if (user.role === 'engineer') {
            return res.json({
              status: 'success',
              message: 'welcome to Engineer panel',
              token,
              user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
              },
            });
          } else {
            return res.json({
              status: 'success',
              message: 'welcome to Recruiter panel',
              token,
              user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
              },
            });
          }
        }
      );
    });
  });
});

// @route GET api/auth/user
// @desc Get users data
// @access Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
