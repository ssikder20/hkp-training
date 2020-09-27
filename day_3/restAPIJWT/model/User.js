const mongoose = require("mongoose");

// User schema has a username and password field
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
