const express = require('express');
const authToken = require('../../middlewares/authToken');
const { confirmPass } = require('../../middlewares/authPassword')
const AuthController = require('../../controllers/authController');
const router = express.Router();


router.route('/register').post(AuthController.signUp);
router.route('/login').get(AuthController.signIn);
router.route('/logout').get(authToken, AuthController.logout);
router.route('/token-reset').get(AuthController.getNewToken);
router.route('/forgot').get(AuthController.forgot);
router.route('/password-reset').post(confirmPass, AuthController.postReset);

module.exports = router;
