const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/userController');
const authToken = require("../../middlewares/authToken");

router.route('/newpassword').post(authToken, UserController.userPassReset)

module.exports = router;
