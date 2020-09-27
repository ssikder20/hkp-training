// Import libraries
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Import databases
const User = require("../model/User");

// Get register page
router.get("/register", (req, res, next) => {
  res.render("register");
});

// Create user in database from login form
router.post("/users/create", async (req, res, next) => {
  // Check if username is already in database
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(409).send("User already exists.");

  // Hash passwords for security
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create user
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser._id);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
