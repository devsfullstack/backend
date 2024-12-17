// jwtUtils.js
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/jwtConfig');
const config = require('../config/config')

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    throw new Error('Token verification failed');
  }
};

module.exports = { generateToken, verifyToken };
