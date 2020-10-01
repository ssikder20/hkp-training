// Import express
const express = require("express");
const router = express.Router();

// Redirect to login page
router.get("/", (req, res, next) => {
  res.redirect("/login");
});

module.exports = router;
