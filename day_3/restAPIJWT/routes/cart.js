const express = require("express");
const router = express.Router();
const verify = require("./verifyToken"); // Token verification middleware
const Item = require("../model/Item"); // Item database

// Return all items assigned to the username with the token in parameter
router.get("/items/get/:token", verify.verifyParam, async (req, res, next) => {
  const username = req.user.username; // Get username to filter item database

  // Find items in database matching username and sent as JSON object
  try {
    const cart = await Item.find({ username: username }); // Get a list of items assigned to a username
    res.send({ items: cart });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// Remove an item from user's cart using item id
router.post("/items/remove", verify.verifyBody, async (req, res, next) => {
  const itemId = req.body._id; // Get item id from request body

  await Item.deleteOne({ _id: itemId }); // Remove item from database

  // Find items in database matching username and sent as JSON object
  try {
    const cart = await Item.find({ username: req.user.username }); // Get a list of items assigned to a username
    res.send({ items: cart });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
