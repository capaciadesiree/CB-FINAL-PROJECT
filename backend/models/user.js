const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
      maxLength: 20
    },
    last_name: {
      type: String,
      required: true,
      maxLength: 20
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 20
    },
    password: {
      type: String,
      required: true
    }
  }, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);