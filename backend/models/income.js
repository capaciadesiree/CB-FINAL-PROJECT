const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "income"
  },
  typeOf: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20
  },
  date: {
    type: Date,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
    maxLength: 20
  },
}, {timestamps: true});

module.exports = mongoose.model('Income', IncomeSchema);
