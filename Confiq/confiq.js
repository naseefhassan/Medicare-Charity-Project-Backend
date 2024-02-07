const mongoose = require("mongoose");

const connect = mongoose
//   .connect(process.env.MONGO_URL)
  .connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1")
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Database not connected");
  });

module.exports = connect;
