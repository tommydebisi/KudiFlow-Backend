const express = require('express');
const router = express.Router();
const TrackController = require('../../controllers/trackController');
const authToken = require('../../middlewares/authToken');

router.route('/income').post(authToken, TrackController.addIncome);
router.route('/expense').post(authToken, TrackController.addExpense);
router.route('/balance').post(authToken, TrackController.addCurrentBal);
router.route('/trackIEs').get(authToken, TrackController.listIncomeExpense);

module.exports = router;
