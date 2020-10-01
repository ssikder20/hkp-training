// Import libraries
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import databases
const User = require("../model/User");

// Focusing only on back-end so front-end pug is not necessary
/* // Get register page (screen 2)
router.get("/register", (req, res, next) => {
  res.render("register");
}); */

// Create and save user in database from login form
router.post("/users/create", async (req, res, next) => {
  // Checks for empty username field
  if (req.body.username == null)
    return res.status(400).send({ message: "Username cannot be empty." });

  // Checks for empty password field
  if (req.body.password == null)
    return res.status(400).send({ message: "Password cannot be empty." });

  // Check if username is already in database
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist)
    return res
      .status(409)
      .send({ message: "User already exists in database." });

  // Bcrypt and hashed passwords are not needed for now
  /* // Hash passwords for security
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt); */

  // Create user
  const user = new User({
    username: req.body.username,
    // password: hashedPassword,
    password: req.body.password,
  });

  try {
    // Save user in database
    const savedUser = await user.save();

    // Create and assign JWT token
    const payload = { _id: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    // Send token in a JSON object
    res.send({ token: token });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
