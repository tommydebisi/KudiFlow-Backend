const jwt = require('jsonwebtoken');
const redisClient = require('../utils/redis');

async function newTokenAuth(req, res, next) {
  // get expired access token from request body
  const { token } = req.body;

  if (!token) return res.status(400).json({ error: "Missing Token" });
  const refreshToken = await redisClient.get(`auth_${token}`);

  // check if token is available
  if (!refreshToken) return res.status(403).json({ error: "Forbidden" });

  // verify refresh token
  jwt.verify(refreshToken, process.env.API_SECRET_REFRESH, (err, field) => {
    if (err) return res.status(403).json({ error: "Unable to verify token" });

    req.id = field.id;
    req.formerToken = token;
    req.refresh = refreshToken;
    next();
  });
}

module.exports = newTokenAuth;
