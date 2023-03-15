
const Track = require('../models/Track');
const dbClient = require('../utils/db');



class TrackController{

  // Controller for adding income
    static async income(req, res) {
      const { amount, description } = req.body;
      if (!amount) return res.status(400).json({ error: 'Missing Amount' });
      if (!description) return res.status(400).json({ error: 'Missing Description' });

      const trackIncome = await dbClient.trackSchemaOne(Track, {})
      return res.json(trackIncome);
    }
  
    static async expenses(req, res) {
      const { amount, description } = req.body;
      if (!amount) return res.status(400).json({ error: 'Missing Amount' });
      if (!description) return res.status(400).json({ error: 'Missing Description' });

      const trackExpenses = await dbClient.trackExpenses(Track, {})
      return res.json(trackExpenses);
    }
  
    //endpoint for retrieving current balance
  static async currentBalance (req, res){
    const trackBalance = dbClient.getSchemaOne(Track, {});
    return res.json(trackBalance.currentBalance);
  };
}


module.exports = TrackController;