// Import libraries
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  // Create and assign JWT token
  const payload = { _id: userValid._id, username: userValid.username };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
  res.header("auth-token", token).send(token);
});

module.exports = router;
