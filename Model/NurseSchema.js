/* eslint-disable new-cap */
const mongoose = require('mongoose');

const NurseProfileSchema = new mongoose.Schema({
  username: {type: String, required: true},
  gender: {type: String, required: true},
  age: {type: Number, required: true},
  phoneNumber: {type: Number, required: true},
  Qualification: {type: String, required: true},
  Experience: {type: String, required: true},
  Image: {type: String},
});

const Nurse = new mongoose.model('Nurse', NurseProfileSchema);
module.exports = Nurse;
