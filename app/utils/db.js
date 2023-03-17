const mongoose = require('mongoose');
class DBClient {
  constructor() {
    this._username = process.env.DB_USERNAME;
    this._password = process.env.DB_PASSWORD;
    this._db = process.env.DB_NAME;

    this.mongo = mongoose.connect(
      `mongodb+srv://${this._username}:${this._password}@cluster0.ijtgnu3.mongodb.net/${this._db}`
      //'mongodb://127.0.0.1:27017/product'
    );
  }

  /**
   * gets one row in the db that match the object passed
   * @param {mongoose.Schema} schema - db schema to query
   * @param {object} obj - obj to search for in db
   * @returns object in db if present else null
   */
  async getSchemaOne(schema, obj) {
    return schema.findOne(obj);
  }

  /**
   * Paginated list of incomes
   * @param {mongoose.Schema} schema - db schema to query
   * @param {mongoose.Types.ObjectId} id - id of schema
   * @param {number} page - page to display
   * @param {number} limit - number of documents to display
   * @returns a list of incomes
   */
  async getIncomeList(schema, id, page = 0, limit = 5) {
    return schema.aggregate([
      { $match: { _id: id } },
      { $unwind: '$income' },
      { $sort: { 'income.createdAt' : -1 } },
      { $skip: page * limit },
      { $limit: limit },
      { $project: {
        _id: 0,
        income: {
          type: '$income.type',
          amount: '$income.amount',
          description: '$income.description',
          currentBalance: '$income.currentBalance',
          createdAt: '$income.createdAt',
        }
      } },
    ]);
  }

  /**
   * Paginated list of expenses
   * @param {mongoose.Schema} schema - db schema to query
   * @param {mongoose.Types.ObjectId} id - id of schema
   * @param {number} page - page to display
   * @param {number} limit - number of documents to display
   * @returns a list of expenses
   */
  async getExpenseList(schema, id, page = 0, limit = 5) {
    return schema.aggregate([
      { $match: { _id: id } },
      { $unwind: '$expense' },
      { $sort: { 'expense.createdAt' : -1 } },
      { $skip: page * limit },
      { $limit: limit },
      { $project: {
        _id: 0,
        expense: {
          amount: '$expense.amount',
          description: '$expense.description',
          currentBalance: '$expense.currentBalance',
          createdAt: '$expense.createdAt',
        }
      } },
    ]);
  }
}
const dbClient = new DBClient();
module.exports = dbClient;
