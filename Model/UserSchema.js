const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", required: true },

});

const userDetails = new mongoose.model("UserData",LoginSchema);

module.exports = userDetails