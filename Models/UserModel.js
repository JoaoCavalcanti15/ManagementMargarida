// Importing mongoose library
const mongoose = require("mongoose");
// Importing bcryptjs library for password hashing
const bcrypt = require("bcryptjs");

// Defining the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Your username is required"], // Username field is required
  },
  password: {
    type: String,
    required: [true, "Your password is required"], // Password field is required
  },
  createdAt: {
    type: Date,
    default: new Date(), // Default value for createdAt is the current date
  },
  isAdmin: {
    type: Boolean,
    default: false // Default value for isAdmin is false
  }
});

// Pre-save hook to hash the password before saving the user document
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12); // Hashing the password with a salt factor of 12
});

// Exporting the User model
module.exports = mongoose.model("User", userSchema, 'User');