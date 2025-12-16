const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
      maxLength: 50
    },
    last_name: {
      type: String,
      required: true,
      maxLength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true
    },
    googleId: { type: String },

  }, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);