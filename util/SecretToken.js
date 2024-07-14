// Load environment variables from .env file
require("dotenv").config();
// Importing JSON Web Token library
const jwt = require("jsonwebtoken");

// Function to create a secret token
module.exports.createSecretToken = (id) => {
  // Signing a new JWT with the user ID, secret key, and expiration time
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60, // Token expiration time set to 3 days
  });
};