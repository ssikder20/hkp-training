// Import libraries and functions
const express = require("express");
const router = express.Router();
const verify = require("./verifyToken"); // Import token verification middleware
const Item = require("../model/Item"); // Import item database

// Focusing only on back-end so front-end pug is not necessary
/* // Get add item page (screen 3)
router.get("/additem", (req, res, next) => {
  res.render("addItem");
}); */

// Create an item in database with user token, and name/quantity supplied by user
router.post("/items/create", verify.verifyBody, async (req, res, next) => {
  // Create new item
  const item = new Item({
    username: req.user.username,
    name: req.body.name,
    quantity: Number(req.body.quantity),
  });

  try {
    // Save item in database
    const savedItem = item.save();

    // Send database entry in a JSON object
    res.send({ item: item });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
