const express = require('express');
const router = express.Router();
const TrackController = require('../controllers/trackController');
const authToken = require('../middlewares/authToken');


router.route('/income').post(authToken, TrackController.income);
router.route('/expenses').post(authToken, TrackController.expense);


module.exports = router;
