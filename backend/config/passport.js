const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

// configure local strat
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    console.log('Attempting authentication for email:', email); // error logging

    const user = await User.findOne({ email });

    if (!user) {
      console.log('No user found');
      return done(null, false, { message: 'Incorrect email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Password mismatch');
      return done(null, false, { message: 'Incorrect password' });
    }

    console.log('User authenticated successfully:', user.email);
    return done(null, user);

  } catch (error) {
    return done(error);
  }
}));

// --- GOOGLE STRATEGY ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 1. Check if user exists by Google ID
      let user = await User.findOne({ googleId: profile.id });
      if (user) return done(null, user);

      // 2. Check if user exists by Email (This prevents the 500 Error!)
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        // User exists (maybe from your manual tests), so we just update them
        user.googleId = profile.id;
        await user.save();
        return done(null, user);
      }

      // 3. Create new user (No password required)
      const newUser = await User.create({
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });
      return done(null, newUser);
    } catch (err) {
      return done(err, null);
    }
  }
));

// serialization and deserialization for maintaining user sessions
passport.serializeUser((user, done) => {
  console.log('Serializing user ID:', user._id);
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  console.log('Deserializing user ID:', _id);
  try {
    const user = await User.findById(_id);
    console.log('Deserialized user:', user);
    done(null, user);
  } catch (error) {
    console.error('Error during deserialization:', error);
    done(error);
  }
});