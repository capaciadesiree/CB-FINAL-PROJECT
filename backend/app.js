const db = require('./db/db');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const { readdirSync } = require('fs');
const MongoStore = require('connect-mongo');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // added

// CORS configuration
app.use(cors({
  origin: [
    'https://mondit.netlify.app', // production domain url
    'https://cb-final-project-production.up.railway.app', // production domain url
    'http://localhost:3000'
    ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// set up session management
// const isProduction = process.env.NODE_ENV === 'production';

app.use(session({ 
  secret: process.env.SECRET_KEY, 
  resave: false, // changed to "true" for debug
  saveUninitialized: false, // changed to "true" for debug
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URL,
    ttl: 24 * 60 * 60, // 24 hours
    collectionName: 'sessions',
  }),
  cookie: { 
    secure: true, // Secure in production, false in development
    httpOnly: true, // Temporarily set false for testing (change to true in production)
    sameSite: 'None', // None for production, Lax for development
    maxAge: 24 * 60 * 60 * 1000, // Add maxAge in milliseconds
  },
  name: 'connect.sid' // set cookie name
}));

// app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// test endpoint to verify session
app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session:', req.session);
  console.log('Is Authenticated:', req.isAuthenticated());
  next();
 });

require('./config/passport');

/*
// Conditional logging for debugging
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log('Session Data:', req.session);
    next();
  });
};
  */

// Dynamically load and use all route files from the 'routes' directory
readdirSync('./routes').map((route) => app.use('/api', require('./routes/' + route )))

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    message: 'Internal Server Error', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// Initialize server and connect to database
const PORT = process.env.PORT || 4000;
console.log("Railway Assigned PORT:", process.env.PORT);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

server();