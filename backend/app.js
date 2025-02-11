const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const db = require('./db/db');
const { readdirSync } = require('fs');
const app = express();
const MongoStore = require('connect-mongo');

// middlewares
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://mondit.netlify.app'], // update to production domain url
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
}));

// set up session management
app.use(session({ 
  secret: process.env.SECRET_KEY, 
  resave: false, 
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URL,
    ttl: 24 * 60 * 60 // 24 hours
  }),
  cookie: { 
    secure: true, // set to true if using HTTPS
    httpOnly: true, // Temporarily set false for testing (change to true in production)
    sameSite: 'Lax', // Ensure cross-origin requests are allowed to send cookies
    maxAge: 24 * 60 * 60 * 1000, // Add maxAge in milliseconds
    domain: '.railway.app' // Optional: might help with cross-domain issues
  } 
}));

app.use(passport.initialize());
app.use(passport.session());

// Added error handlers for Passport
passport.serializeUser((user, done) => {
  console.log('Serializing user:', user._id);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log('Deserializing user:', id);
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error('Deserialize error:', error);
    done(error);
  }
});

require('./config/passport');

// Conditional logging for debugging
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log('Session Data:', req.session);
    next();
  });
}

// Dynamically load and use all route files from the 'routes' directory
readdirSync('./routes').map((route) => app.use('/api', require('./routes/' + route )))

// Initialize server and connect to database
const PORT = process.env.PORT

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

server();