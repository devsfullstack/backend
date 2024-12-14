// jwtUtils.js
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/jwtConfig');

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, jwtSecret, { expiresIn: jwtExpiresIn });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new Error('Token verification failed');
  }
};

module.exports = { generateToken, verifyToken };
