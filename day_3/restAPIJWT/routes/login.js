// Import libraries
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import databases
const User = require("../model/User");

// Focusing only on back-end so front-end pug is not necessary
/* // Get login page (screen 1)
router.get("/login", (req, res, next) => {
  res.render("login");
}); */

// Authenticate user and redirect to "Add Item" form with JWT token
router.post("/users/login", async (req, res, next) => {
  // Validate username
  const user = await User.findOne({ username: req.body.username });
  if (!user)
    return res.status(400).send({ message: "Username or passsword is wrong." }); // Change to "Username or password is wrong" when deploying

  // Validate password
  const password = req.body.password === user.password;
  // Bcrypt and hashed passwords are not needed for now
  /* const passwordValid = await bcrypt.compare(
    req.body.password,
    userValid.password
  ); */
  if (!password)
    return res.status(400).send({ message: "Username or password is wrong." });

  // Create and assign JWT token
  const payload = { _id: user._id, username: user.username };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });

  try {
    // Send token in a JSON object
    res.send({ token: token });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
