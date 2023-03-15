const { Types } = require('mongoose');
const Track = require('../models/Track');
const dbClient = require('../utils/db');


class TrackController {
  // Controller for adding income
  static async income(req, res) {
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

    track.save();

    return res.status(201).json({
      currentBalance: track.currentBalance, income: track.income.slice(-1)[0]
    });
  }

  static async expenses(req, res) {
    const { amount, description } = req.body;
    if (!amount) return res.status(400).json({ error: 'Missing Amount' });
    if (!description) return res.status(400).json({ error: 'Missing Description' });

    const trackExpenses = await dbClient.trackExpenses(Track, {});
    return res.json(trackExpenses);
  }

  //endpoint for retrieving current balance
  static async currentBalance(req, res) {
    const trackBalance = dbClient.getSchemaOne(Track, {});
    return res.json(trackBalance.currentBalance);
  };
}


module.exports = TrackController;
