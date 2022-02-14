require("dotenv").config();

// Code Dependencies - Including packages
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

// initialize app variables with express()
const app = express();

const users = require('./routes/users');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/users', users);


// variable - Can edit which portname or port to host the website locally
const host_name = process.env.HOST_NAME;
const port = process.env.HOST_PORT;

// Index route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start Server
app.listen(port, () => {
  console.log(`Listening at http://${host_name}:${port}`);
});
