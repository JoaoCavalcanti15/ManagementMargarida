// Importing the User model
const User = require("../Models/UserModel");
// Importing environment variables
require("dotenv").config();
// Importing the JSON Web Token library
const jwt = require("jsonwebtoken");

// Function to verify the user based on the token
module.exports.userVerification = (req, res) => {
  // Get the token from cookies
  const token = req.cookies.token;

  // Check if the token is not present
  if (!token) {
    return res.json({ status: false });
  }

  // Verify the token
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      // If token verification fails, send a response with status false
      return res.json({ status: false });
    } else {
      // Find the user by ID from the decoded token data
      const user = await User.findById(data.id);
      if (user) {
        // If user is found, send a response with status true and the username
        return res.json({ status: true, user: user.username });
      } else {
        // If user is not found, send a response with status false
        return res.json({ status: false });
      }
    }
  });
};
