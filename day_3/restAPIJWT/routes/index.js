const express = require("express");
const router = express.Router();

// First Screen - Login Page
router.get("/", (req, res, next) => {
  res.redirect("/login");
});

module.exports = router;
