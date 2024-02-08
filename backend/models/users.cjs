const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  pernr: { type: String, unique: true },
  gdud: String,
  isManager: Boolean,
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
