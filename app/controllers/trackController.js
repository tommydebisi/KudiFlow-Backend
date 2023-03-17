const { Types } = require('mongoose');
const Track = require('../models/Track');
const dbClient = require('../utils/db');


class TrackController {
  // Controller for adding income
  static async addIncome(req, res) {
    const { amount, description } = req.body;
    if (!amount) return res.status(400).json({ error: 'Missing Amount' });
    if (!description) return res.status(400).json({ error: 'Missing Description' });

    // get the current track by user id
    const track = await dbClient.getSchemaOne(Track, { userId: new Types.ObjectId(req.userId) });
    const incomeCB = track.currentBalance + amount;
    track.income.push({ amount, description, currentBalance: incomeCB });

    // add income to total income
    track.totalIncome += amount;
    track.currentBalance = track.totalIncome - track.totalExpenses;

    // date: { $dateToString: { format: "%Y-%m-%d", date: "$$lastIncome.createdAt" },
    // time: { $dateToString: { format: "%H:%M:%S", date: "$$lastIncome.createdAt" }

    // save track
    track.save();

    return res.status(201).json({ message: 'success' });
  }

  // Controller for adding Expenses
  static async addExpense(req, res) {
    const { amount, description } = req.body;
    if (!amount) return res.status(400).json({ error: 'Missing Amount' });
    if (!description) return res.status(400).json({ error: 'Missing Description' });

    // get the current track by user id
    const track = await dbClient.getSchemaOne(Track, { userId: new Types.ObjectId(req.userId) });
    const expensesCB = track.currentBalance - amount;
    track.expense.push({ amount, description, currentBalance: expensesCB });

    // add expenses to total income
    track.totalExpenses += amount;
    track.currentBalance = track.totalIncome - track.totalExpenses;
    track.save();

    return res.status(201).json({ message: 'success' });
  }

  // controller for adding new current balance
  static async addCurrentBal(req, res) {
    const { currentBalance } = req.body;
    if (!currentBalance) return res.status(400).json({ error: 'Missing CurrentBalance' });

    // get the current track by user id
    const track = await dbClient.getSchemaOne(Track, { userId: new Types.ObjectId(req.userId) });

    track.currentBalance = currentBalance;
    track.totalIncome = currentBalance;
    track.save();

    return res.status(201).json({ message: 'success' });
  }

  // Controller for getting paginated list of income and expenses
  static async listIncomeExpense(req, res) {
    // get the page or limit to display from query string
    let limit, page;
    limit = req.query.limit || 5;
    page = req.query.page || 0;

    // convert to numbers if present
    limit = Number(limit);
    page = Number(page);

    // get the current track by user id
    const track = await dbClient.getSchemaOne(Track, { userId: new Types.ObjectId(req.userId) });

    try {
      // get income and expense list
      const incomeList = await dbClient.getIncomeList(Track, track._id, page, limit);
      const expenseList = await dbClient.getExpenseList(Track, track._id, page, limit);

      return res.status(200).json({
        currentBalance: track.currentBalance,
        incomes: incomeList,
        expenses: expenseList,
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
}

module.exports = TrackController;
