const mongoose = require("mongoose");
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
   * Paginated list of income an expenses
   * @param {mongoose.Schema} schema - db schema to query
   * @param {mongoose.Types.ObjectId} id - id of schema
   * @param {number} page - page to display
   * @param {number} limit - number of documents to display
   * @returns a list of incomes
   */
  async getFlowList(schema, id, page = 0, limit = 5) {
    const pipeline = [
      { $match: { _id: id } },
      { $unwind: "$cashFlow" },
      { $sort: { "cashFlow.createdAt": -1 } },
      { $skip: page * limit },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          cashFlow: {
            type: "$cashFlow.type",
            amount: "$cashFlow.amount",
            description: "$cashFlow.description",
            currentBalance: "$cashFlow.currentBalance",
            createdAt: "$cashFlow.createdAt",
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$cashFlow.createdAt" },
            month: { $month: "$cashFlow.createdAt" },
            day: { $dayOfMonth: "$cashFlow.createdAt" },
          },
          data: { $push: "$$ROOT" },
        },
      },
    ];
    return schema.aggregate(pipeline);
  }
}
const dbClient = new DBClient();
module.exports = dbClient;
