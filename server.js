require("dotenv").config();

// Code Dependencies - Including packages and libraries
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connecting to Mongo database
mongoose.connect(config.database); // databse is stores in the config file

// On Connection - Checks for connection
mongoose.connection.on("connected", () => {
  console.log("Connected to database" + config.database);
});

// Error Connection - Outputs error message to console if no connection
mongoose.connection.on("error", (err) => {
  console.log("Database error:" + err);
});

// Initialize Express framework
const app = express();

// Routes for database - directs to functions for each data block
const users = require("./routes/users");

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use '/users' for all our user route functions
app.use("/users", users);

// variable - Can edit which portname or port to host the website locally
const host_name = process.env.HOST_NAME;
const port = process.env.HOST_PORT;

// Index route
app.get("/", (req, res) => {
  res.send("Invalid Endpoint!");
});

// Start Server
app.listen(port, () => {
  console.log(`Listening at http://${host_name}:${port}`);
});
