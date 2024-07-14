// Importing required libraries
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config(); // Load environment variables from .env file
const cookieParser = require("cookie-parser");
const appRoute = require("./Routes/AppRoute"); // Importing routes
const { MONGO_URL, PORT, ORIGIN } = process.env; // Destructuring environment variables

// Connecting to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// CORS middleware configuration
const corsOptions = {
  origin: ORIGIN, // Allow requests from frontend origin
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  credentials: true, // Enable credentials (cookies, authorization headers) cross-origin
};

// Apply CORS middleware to all routes with specific origin
app.use(cors({
   origin: 'https://margarida-insuflaveis-app.netlify.app'
 }));

// Middleware to parse cookies
app.use(cookieParser());
// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/", appRoute); // Use the imported routes

// Exporting the app module
module.exports = app;