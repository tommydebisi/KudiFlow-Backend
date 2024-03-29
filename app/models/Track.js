const mongoose = require('mongoose');
const { User } = require('./User');

/**
 * @typedef Track
 */
const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  currentBalance: {
    type: Number,
    default: 0
  },
  totalIncome: {
    type: Number,
    min: 0,
    default: 0
  },
  totalExpenses: {
    type: Number,
    min: 0,
    default: 0
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  cashFlow: [{
    type: {
      type: String,
      default: 'None'
    },
    amount: {
      type: Number,
      min: 0,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    currentBalance: {
      type: String,
      default: 0,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: Date.now
    },
  }],
}, {
  versionKey: '1.0'
});

// get total income
trackSchema.virtual('incomeTotal').get(function() {
  return this.income.reduce((total, income) => total + income.amount, 0);
});

// get total expenses
trackSchema.virtual('expenseTotal').get(function() {
  return this.expense.reduce((total, expense) => total + expense.amount, 0);
});

trackSchema.pre('save', (next) => {
  this.updatedAt = Date.now;
  next();
});

/**
 * @typedef Track
 */
const Track = mongoose.model('Track', trackSchema);
module.exports = Track;
