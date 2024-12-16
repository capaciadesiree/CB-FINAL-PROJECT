const bcrypt = require('bcrypt');
const passport = require('passport');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const user = require('../models/user');

exports.getSignup = (req, res) => {
  // res.render('signup'); // render signup page
  res.status(200).json({ message: 'Welcome to Signup page'});
};

exports.postSignup = async (req, res) => {
  const {first_name, last_name, email, password, confirmPassword} = req.body;

  const user = User({
    first_name,
    last_name,
    email,
    password
  });

  try {
    // validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(400).json({ message: errorMessages });
    }

    if(!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: 'All fields required'});
    }
    if(password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match'});
    }
    
    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    res.setHeader('Content-Type', 'application/json'); // for json formatting
    res.status(200).json({ message: 'User successfully registered' });
  } catch (error) {
    res.setHeader('Content-Type', 'application/json'); // for json formatting
    res.status(500).json({ message: 'SERVER ERROR' });
  }

  console.log(user);
};

exports.getLogin = async (req, res) => {
  // res.render('login'); // render login page
  res.status(200).json({ message: 'Welcome to Login page'});

};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'SERVER ERROR', error: err });
    }
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'SERVER ERROR', error: err });
      }
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
};

// redirect-based response (use when frontend is connected)
// exports.postLogin = passport.authenticate('local', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/auth/login',
//   failureFlash: true
// });

exports.logout = (req, res) => {
 req.logout((err) => {
  if (err) {
    return res.status(500).json({ message: 'SERVER ERROR DURING LOGOUT' });
  }
  res.setHeader('Content-Type', 'application/json'); // for json formatting
  res.status(200).json({ message: 'User successfully logged out' });
  });
};