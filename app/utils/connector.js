const dbClient = require('./db');
const redisClient = require('./redis');

/**
 * starts the database and application server
 * @param {*} app - express application to start
 * @param {number} port - port to listen on
 */


async function startConnection(app, port) {
  await dbClient.mongo
    .then(async () => {
    console.log('db Connected')
    await redisClient.client.connect();

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
}



module.exports = startConnection;
