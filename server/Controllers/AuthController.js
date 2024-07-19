const User = require("../Models/UserModel");
const { generateToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { username, password, isAdmin } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }
    const user = await User.create({ username, password, isAdmin, createdAt: new Date() });
    const token = generateToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "User signed up successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const token = generateToken(user._id); // Generate token

    // If you want to use cookies for storing tokens
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false, // Consider using httpOnly: true for better security
    // });

    // Send back the token in the response body
    res.status(200).json({ message: "User logged in successfully", success: true, token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};