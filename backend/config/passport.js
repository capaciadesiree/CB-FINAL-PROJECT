const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

// configure local strat
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('No user found with this email:', email);
      return done(null, false, { message: 'Incorrect email' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return done(null, false, { message: 'Incorrect password' });
    }
    console.log('User authenticated successfully:', user.email);
    return done(null, user);
  } catch (error) {
    console.error('Error in Passport strategy:', error);
    return done(error);
  }
}));

// serialization and deserialization for maintaining user sessions
passport.serializeUser((user, done) => {
  console.log('Serializing user ID:', user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('Deserializing user ID:', id);
  try {
    const user = await User.findById(id);
    console.log('Deserialized user:', user);
    done(null, user);
  } catch (error) {
    console.error('Error during deserialization:', error);
    done(error);
  }
});