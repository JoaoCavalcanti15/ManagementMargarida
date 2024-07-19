const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const appRoute = require("./Routes/AppRoute");
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// CORS middleware configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from frontend origin
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  credentials: true, // Enable credentials (cookies, authorization headers) cross-origin
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
  ],
};

// Apply CORS middleware to all routes
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/", appRoute);

module.exports = app;