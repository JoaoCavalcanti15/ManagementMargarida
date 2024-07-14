// Importing required modules
const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

// Signup function to handle user registration
module.exports.Signup = async (req, res, next) => {
  try {
    // Extracting username, password, and isAdmin from request body
    const { username, password, isAdmin } = req.body;

    // Checking if a user with the given username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      // If user already exists, send a response with message and success status
      return res.json({ message: "User already exists", success: false });
    }

    // Creating a new user with the provided details
    const user = await User.create({ username, password, isAdmin, createdAt: new Date() });

    // Generating a secret token for the new user
    const token = createSecretToken(user._id);

    // Setting a cookie with the token
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // Sending a success response with the user object
    res.status(201).json({ message: "User signed up successfully", success: true, user });

    // Calling the next middleware function
    next();
  } catch (error) {
    // Logging the error and sending an error response
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Login function to handle user authentication
module.exports.Login = async (req, res, next) => {
  try {
    // Extracting username and password from request body
    const { username, password } = req.body;
    
    // Checking if both username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Finding the user by username
    const user = await User.findOne({ username });

    // If user is not found, send an unauthorized response
    if (!user) {
      return res.status(401).json({ message: 'Incorrect password or username' });
    }

    // Comparing provided password with the stored hashed password
    const auth = await bcrypt.compare(password, user.password);

    // If password does not match, send an unauthorized response
    if (!auth) {
      return res.status(401).json({ message: 'Incorrect password or username' });
    }

    // Generating a secret token for the authenticated user
    const token = createSecretToken(user._id);
    
    // Setting a cookie with the token
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // Sending a success response with the user object
    res.status(200).json({ message: "User logged in successfully", success: true, user });
  } catch (error) {
    // Logging the error and sending an error response
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};