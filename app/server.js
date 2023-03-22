require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const authRouter = require('./routes/authRoute');
const trackRouter = require('./routes/trackRoute');
const startConnection = require('./utils/connector');



// parse json in request body
app.use(express.json());

// parse form in request body
app.use(express.urlencoded({extended: false}));

// promotes cross origin resource sharing
app.use(cors());

// use middleware for authRequests
app.use('/account', authRouter);
app.use('/track', trackRouter);

startConnection(app, 5000);
module.exports = app;
