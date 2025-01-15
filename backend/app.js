const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const db = require('./db/db');
const { readdirSync } = require('fs');
const app = express();
const authRoutes = require('./routes/auth');

// middlewares
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
}));

// set up session management
app.use(session({ 
  secret: process.env.SECRET_KEY, 
  resave: false, 
  saveUninitialized: false,
  cookie: { 
    secure: true, // set to true if using HTTPS
    httpOnly: true, // Temporarily set false for testing (change to true in production)
    sameSite: 'None', // Ensure cross-origin requests are allowed to send cookies
  } 
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport');

app.use((req, res, next) => {
  console.log('Session Data:', req.session);  // Log the session data
  next();
});

// app.get('/', (req, res) => {
//   res.send('Homepage')
// });

// auth routes & added middleware for user
app.use('/api', authRoutes);

// Dynamically load and use all route files from the 'routes' directory
readdirSync('./routes').map((route) => {
  if (route !== 'auth.js') { // Avoid loading auth routes again
    app.use('/api/v1', require('./routes/' + route ));
  }
});

// Initialize server and connect to database
const PORT = process.env.PORT

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

server();