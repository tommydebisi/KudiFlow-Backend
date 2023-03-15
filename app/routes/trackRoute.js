const express = require('express');
const router = express.Router();
const TrackController = require('../controllers/trackController');


router.route('/income').post(TrackController.income);

router.route('/expenses').post(TrackController.expenses);

router.route('/currentBalance').get(TrackController.currentBalance);


module.exports = router;