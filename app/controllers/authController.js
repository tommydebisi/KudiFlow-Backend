const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const { Types } = require("mongoose");
const dbClient = require("../utils/db");
const redisClient = require("../utils/redis");
const { User } = require("../models/User");
const Track = require("../models/Track");
const {
  hashPassword,
  generateAccessToken,
  sendEmail,
} = require("../utils/helper");
const { createUserSchema } = require("../validators/Validate");

class AuthController {
  static async signUp(req, res) {
    const { username, email, password } = req.body;

    if (!username) return res.status(400).json({ message: "Missing username" });
    if (!email) return res.status(400).json({ message: "Missing email" });
    if (!password) return res.status(400).json({ message: "Missing password" });

    // validate password meets criteria
    try {
      await createUserSchema.validateAsync({ email, password });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

    // Check if user already exists
    const existingUser = await dbClient.getSchemaOne(User, { email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashed_password = await hashPassword(password);
    try {
      // Create new user
      const user = await User.create({ username, email, hashed_password });
      // create new track for user
      const track = await Track.create({ userId: user._id });

      return res.status(201).json({ message: "success" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;

    // check if email and password is present
    if (!email) return res.status(400).json({ message: "Missing email" });

    // validate email using Joi schema
    /**const { error } = await loginUserSchema.validateAsync({ email });
    if (error) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
**/
    if (!password) return res.status(400).json({ message: "Missing password" });

    const user = await dbClient.getSchemaOne(User, { email });
    if (!user || !(await compare(password, user.hashed_password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    //signing token with user id
    const accessToken = generateAccessToken({ id: user._id.toString() });
    const refreshToken = jwt.sign(
      { id: user._id.toString() },
      process.env.API_SECRET_REFRESH
    );

    // save refresh token in redis
    const result = await redisClient.set(`auth_${accessToken}`, refreshToken);

    //responding to client request access and request tokens.
    res.status(202).json({ accessToken });
  }

  static async getNewToken(req, res) {
    const accessToken = generateAccessToken({ id: req.id });
    // remove previous accessToken
    await redisClient.del(`auth_${req.formerToken}`);
    await redisClient.setex(`auth_${accessToken}`, req.refresh, 46200);
    return res.status(200).json({ accessToken });
  }

  static async logout(req, res) {
    await redisClient.del(`auth_${req.token}`);
    return res.status(204).end();
  }

  static async forgot(req, res) {
    const { email } = req.body;

    // check if the user email is present in db
    const user = await dbClient.getSchemaOne(User, { email });

    if (!user) return res.status(404).json({ message: "Not Found" });
    const resetToken = require("crypto").randomBytes(30).toString("hex");

    try {
      // store reset password with expiry for 4min
      await redisClient.setex(`reset_${resetToken}`, user._id.toString(), 240);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }

    // send email with reset token
    sendEmail(resetToken, email);

    return res.status(202).json({ message: "success" });
  }

  static async postReset(req, res) {
    // get and update user with id, change userId in str to objectId
    const user = await dbClient.getSchemaOne(User, {
      _id: new Types.ObjectId(req.userId),
    });

    if (!user) return res.send("Error getting user");

    user.hashed_password = await hashPassword(req.newPass);
    user.save();

    return res.status(200).json({ message: "success" });
  }
}

module.exports = AuthController;
