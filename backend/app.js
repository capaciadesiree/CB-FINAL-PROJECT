const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Homepage')
})

// Dynamically load and use all route files from the 'routes' directory
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route )))

// Initialize server and connect to database
const PORT = process.env.PORT

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

server();