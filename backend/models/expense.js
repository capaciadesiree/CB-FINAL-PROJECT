const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  typeOf: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
    maxLength: 20
  },
  type: {
    type: String,
    default: "expense"
  },
  date: {
    type: Date,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20
  },
}, {timestamps: true});

module.exports = mongoose.model('Expense', ExpenseSchema);
