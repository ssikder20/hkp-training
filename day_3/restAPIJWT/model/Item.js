const mongoose = require("mongoose");

// Item schema contains the username, item name, and item quantity
const itemSchema = new mongoose.Schema({
  username: { type: String }, // Username from token who created item
  name: { type: String }, // Name of item
  quantity: { type: Number }, // Quantity of item
});

module.exports = mongoose.model("Item", itemSchema);
