const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swagger');

const router = express.Router();

// use custom options to set title and css of docs
router.use('/', swaggerUI.serve,
  swaggerUI.setup(swaggerDefinition, { explorer: true })
  );

module.exports = router;
