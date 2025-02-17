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

// trust proxy
app.set('trust proxy', 1);

// CORS configuration
app.use(cors({
  origin: 'https://mondit.netlify.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
 }));

// set up session management
const sessionMiddleware = session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 24 * 60 * 60,
    autoRemove: 'native',
    crypto: {
      secret: false
    }
  }),
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000
  },
  rolling: true,
  proxy: true
 });

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Session debugging middleware
app.use((req, res, next) => {
  const sessionCookie = req.headers.cookie?.match(/connect\.sid=([^;]+)/)?.[1];
  console.log('Session check:', {
    cookieHeader: req.headers.cookie,
    sessionCookie,
    sessionID: req.sessionID,
    hasSession: !!req.session,
    sessionData: req.session,
    isAuthenticated: req.isAuthenticated?.()
  });
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