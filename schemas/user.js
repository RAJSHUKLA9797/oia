const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  phone_number: { type: String, required: true },
  priority: { type: Number, enum: [0, 1, 2], required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
