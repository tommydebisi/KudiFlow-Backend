const { Types } = require("mongoose");
const Track = require("../models/Track");
const dbClient = require("../utils/db");

class TrackController {
  // Controller for adding CashFlow
  static async addCashFlow(req, res) {
    const { amount, description, type } = req.body;
    if (!amount) return res.status(400).json({ error: "Missing Amount" });
    if (!description)
      return res.status(400).json({ error: "Missing Description" });
    if (!type) return res.status(400).json({ error: "Missing Type" });

    // get the current track by user id
    const track = await dbClient.getSchemaOne(Track, {
      userId: new Types.ObjectId(req.userId),
    });

    // add to cashflow based on type
    let cFlow;
    if (type === "Expense") {
      cFlow = track.currentBalance - amount;
      track.totalExpenses += amount;
    } else {
      cFlow = track.currentBalance + amount;
      track.totalExpenses += amount;
    }

    track.cashFlow.push({
      type,
      amount,
      description,
      currentBalance: cFlow,
    });

    // get the current balance
    track.currentBalance = track.totalIncome - track.totalExpenses;
    track.save();

    return res.status(201).json({ message: "success" });
  }

  // controller for adding new current balance
  static async addCurrentBal(req, res) {
    const { currentBalance } = req.body;
    if (!currentBalance)
      return res.status(400).json({ error: "Missing CurrentBalance" });

    // get the current track by user id
    const track = await dbClient.getSchemaOne(Track, {
      userId: new Types.ObjectId(req.userId),
    });

    track.currentBalance = currentBalance;
    track.totalIncome = currentBalance;
    track.save();

    return res.status(201).json({ message: "success" });
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
    const track = await dbClient.getSchemaOne(Track, {
      userId: new Types.ObjectId(req.userId),
    });

    try {
      // get income and expense list
      const flowList = await dbClient.getFlowList(
        Track,
        track._id,
        page,
        limit
      );

      return res.status(200).json({
        currentBalance: track.currentBalance,
        flowList,
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
}

module.exports = TrackController;
