// jwtUtils.js
const jwt = require('jsonwebtoken');
const config = require('../config/config')

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    throw new Error('Fallo la verifiación del token');
  }
};

module.exports = { generateToken, verifyToken };
