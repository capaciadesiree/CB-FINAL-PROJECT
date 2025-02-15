const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

// configure local strat
assport.use(new LocalStrategy({ 
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    console.log('Attempting authentication for email:', email);
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('No user found');
      return done(null, false);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return done(null, false);
    }

    console.log('User authenticated:', user);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// serialization and deserialization for maintaining user sessions
passport.serializeUser((user, done) => {
  const sessionUser = { 
    _id: user._id,
    email: user.email,
    first_name: user.first_name
  };
  console.log('Serializing user:', sessionUser);
  done(null, sessionUser);
});

passport.deserializeUser((sessionUser, done) => {
  console.log('Deserializing user:', sessionUser);
  done(null, sessionUser);
});
