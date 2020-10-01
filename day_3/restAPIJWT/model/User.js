const mongoose = require("mongoose");

// User schema has a username and password field
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("User", userSchema);
