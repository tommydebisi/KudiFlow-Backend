const express = require('express');
const docsRoute = require('./docsRoute');
const authRoute = require('./authRoute');
const trackRoute = require('./trackRoute');
const userRoute = require('./userRoute');

const router = express.Router();

// list of routes
const defaultRoute = [
  {
    path: '/account',
    route: authRoute,
  },
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/track',
    route: trackRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
]

// use all routes
defaultRoute.forEach((val) => {
  router.use(val.path, val.route);
});

module.exports = router;
