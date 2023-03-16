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


    // Use aggregation framework to extract date and time values
    const incomeWithDate = await Track.aggregate([
      { $match: { _id: track._id } },
      { $project: {
          currentBalance: 1,
          income: {
            $let: {
              vars: {
                lastIncome: { $arrayElemAt: [ "$income", 1 ] }
              },
              in: {
                type: "$$lastIncome.type",
                amount: "$$lastIncome.amount",
                description: "$$lastIncome.description",
                currentBalance: "$$lastIncome.currentBalance",
                _id: "$$lastIncome._id",
                date: { $dateToString: { format: "%Y-%m-%d", date: "$$lastIncome.createdAt" } },
                time: { $dateToString: { format: "%H:%M:%S", date: "$$lastIncome.createdAt" } }
              }
            }
          }
        }
      }
    ]);
  
    const modifiedIncome = incomeWithDate[0].income;
  
    // save track
    track.save();
  
    return res.status(201).json({
      currentBalance: track.currentBalance,
      income: modifiedIncome
    });
    
  }
  

   // Controller for adding Expenses
   static async expense(req, res) {
    const { amount, description } = req.body;
    if (!amount) return res.status(400).json({ error: 'Missing Amount' });
    if (!description) return res.status(400).json({ error: 'Missing Description' });

    // get the current track by user id
    const track = await dbClient.getSchemaOne(Track, { userId: new Types.ObjectId(req.userId) });
    const expensesCB = track.currentBalance + amount;
    track.expense.push({ amount, description, currentBalance: expensesCB });

    // add expenses to total income
    track.totalExpenses += amount;
    track.currentBalance = track.totalIncome - track.totalExpenses;

    track.save();

    return res.status(201).json({
      currentBalance: track.currentBalance, income: track.income.slice(-1)[0]
    });
  }

  
}

module.exports = TrackController;
