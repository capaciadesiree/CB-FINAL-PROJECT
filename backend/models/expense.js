const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    default: "expense"
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

module.exports = mongoose.model('Expense', ExpenseSchema);
