// Import libraries
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Import databases
const User = require("../model/User");

// Get login page
router.get("/login", (req, res, next) => {
  res.render("login");
});

// Authenticate user and redirect to "Add Item" form with JWT token
router.post("/users/login", async (req, res, next) => {
  // Validate username
  const userValid = await User.findOne({ username: req.body.username });
  if (!userValid) return res.status(400).send("Username does not exist."); // Change to "Username or password is wrong" when deploying

  // Validate password
  const passwordValid = await bcrypt.compare(
    req.body.password,
    userValid.password
  );
  if (!passwordValid) return res.status(400).send("Password is wrong.");

  try {
    res.send("Logged in.");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
