/* eslint-disable new-cap */
const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId }, // Update the type to ObjectId
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", required: true },
});

const userDetails = new mongoose.model("UserData", LoginSchema);

module.exports = userDetails;
