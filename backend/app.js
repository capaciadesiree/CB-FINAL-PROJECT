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


app.use((req, res, next) => {
  console.log('---------------------');
  console.log('Incoming request:', req.path);
  console.log('Cookie from request:', req.headers.cookie);
  console.log('Session ID:', req.sessionID);
  next();
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  ttl: 24 * 60 * 60,
  autoRemove: 'native'
});

// Session configuration
app.use(session({
  store: sessionStore,
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000
  },
  name: 'connect.sid'
}));

// CORS после session
app.use(cors({
  origin: 'https://desiree-frontend.netlify.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Debug middleware
app.use((req, res, next) => {
  const sessionID = req.headers.cookie?.split('connect.sid=')[1]?.split(';')[0];
  console.log('Debug:', {
    receivedCookie: req.headers.cookie,
    parsedSessionID: sessionID,
    currentSessionID: req.sessionID,
    hasSession: !!req.session,
    isAuthenticated: req.isAuthenticated?.()
  });
  next();
});

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

// Conditional logging for debugging
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log('Session Data:', req.session);
    next();
  });
}

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

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

server();
