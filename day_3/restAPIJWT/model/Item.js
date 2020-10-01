const mongoose = require("mongoose");

// Item schema contains the username, item name, and item quantity
const itemSchema = new mongoose.Schema({
  username: String, // Username from token who created item
  name: String, // Name of item
  quantity: Number, // Quantity of item
});

module.exports = mongoose.model("Item", itemSchema);
