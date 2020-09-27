// Import Libraries
const express = require("express");
const router = express.Router();

// Import Databases
const User = require("../model/User");

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.post("/users/create", async (req, res, next) => {
  const user = await new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
