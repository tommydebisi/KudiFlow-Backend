const express = require('express');
const router = express.Router();
const TrackController = require('../../controllers/trackController');
const authToken = require('../../middlewares/authToken');

router.route('/cashFlow').post(authToken, TrackController.addCashFlow);
router.route('/balance').post(authToken, TrackController.addCurrentBal);
router.route('/trackIEs').get(authToken, TrackController.listIncomeExpense);

module.exports = router;
