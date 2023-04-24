const { Types } = require("mongoose");
const { User } = require("../models/User");
const dbClient = require("../utils/db");
const { hashPassword } = require('../utils/helper')

class UserController {
  static async userPassReset(req, res) {
    // get the new password from the body
    const { newPassword } = req.body;
    // get user in the database
    const user = await dbClient.getSchemaOne(User, {
      _id: new Types.ObjectId(req.userId),
    });

    user.hashed_password = await hashPassword(newPassword);
    user.save();

    return res.status(201).json({ message: "success" });
  }
}

module.exports = UserController;
