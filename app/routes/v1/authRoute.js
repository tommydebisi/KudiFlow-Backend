const express = require('express');
const authToken = require('../../middlewares/authToken');
const { confirmPass } = require('../../middlewares/authPassword')
const AuthController = require('../../controllers/authController');
const router = express.Router();


router.route('/register').post(AuthController.signUp);
router.route('/login').post(AuthController.signIn);
router.route('/logout').get(authToken, AuthController.logout);
router.route('/token-reset').post(AuthController.getNewToken);
router.route('/forgot').post(AuthController.forgot);
router.route('/password-reset').post(confirmPass, AuthController.postReset);

module.exports = router;
