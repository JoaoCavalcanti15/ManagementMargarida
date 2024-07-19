require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.TOKEN_KEY, { expiresIn: '1h' });
};

module.exports = { generateToken };