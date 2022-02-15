const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

// User Scheme - represenation of what the databse will hold
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Exports the model scheme of the database
const User = (module.exports = mongoose.model("User", UserSchema));

// Find user by ID - Used for Login
module.exports.getUserById = function (id, callback) {
  // Function is from Mongoose
  User.findById(id, callback);
};

// Find user by Email - Used for Login
module.exports.getUserByEmail = function (email, callback) {
  const query = { email: email };
  User.findOne(query, callback);
};

// Find user by phoneNumber - Used for Login
module.exports.getUserByPhoneNumber = function (phoneNumber, callback) {
  const query = { phoneNumber: phoneNumber };
  User.findOne(query, callback);
};

// Hash the password and add the user to the database
module.exports.addUser = function (newUser, callback) {
  // The higher the Salt value, the more the hashing algorithm takes
  bcrypt.genSalt(10, (err, salt) => {
    // Hashes the password
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        // outputs an error message
        throw err;
      }
      newUser.password = hash; // assigns the hashed password to variable: password
      newUser.save(callback); // saves the user info to database
    });
  });
};

// Compares entered password to hashed password in the database - Used for login
module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) console.log(isMatch); // Outputs in console log if passwords don't match
    // Returns true if match
    callback(null, isMatch);
  });
};
