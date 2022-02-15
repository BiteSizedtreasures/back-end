const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/database");

// Process to register the user
router.post("/register", (req, res, next) => {
  // Creates a new user object with the data received
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    phonenumber: req.body.phoneNumber,
    password: req.body.password,
  });
  // notifies if user has been created
  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, message: "Failed to register user." });
    } else {
      res.json({ success: true, message: "User successfully registered." });
    }
  });
});

// Authenticate if the user is already registered
router.post("/authenticate", (req, res, next) => {
  // retreive email and password once login button is clicked
  const email = req.body.email;
  const password = req.body.password;
  // Checks if the email is found in the database
  User.getUserByEmail(email, (err, user) => {
    if (err) { // if an error message occurs
      throw err;
    }
    if (!user) { // if user is not found
      return res.json({ success: false, message: "User not found." });
    }
    // Checks if password macthes with the user account
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) { // if an error message occurs
        throw err;
      }
      if (isMatch) { // if user is found, output info and add user to session
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800, // 1 week : Will keep the user logged in till 1 week
        });
        res.json({ // returns object in JSON format
          success: true,
          token: "JWT " + token,
          user: {
            id: user._id,
            name: user.name,
            phonenumber: user.phoneNumber,
            email: user.email,
          },
        });
      } else { // if password does not match, output message
        return res.json({ success: false, message: "Wrong password." });
      }
    });
  });
});

// Profile - Needs to be worked on. 
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      sucess: true,
      user: {
        _id: `JWT ` + req.user._id,
        name: user.name,
        phonenumber: user.phoneNumber,
        email: user.email,
      },
    });
  }
);

module.exports = router;
