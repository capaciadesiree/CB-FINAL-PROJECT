const mongoose = require('mongoose');

const db = async () => {
  try {
      mongoose.set('strictQuery', false)
      await mongoose.connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log('Database Connected');

      // event listeners
      mongoose.connection.on('error', err => {
        console.log('MongoDB connection error:', err);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
      });

  } catch (error) {
    console.log('Database Connection Error:', error);
  }
};

module.exports = db;