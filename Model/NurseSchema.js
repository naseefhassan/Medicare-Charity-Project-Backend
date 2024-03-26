/* eslint-disable new-cap */
const mongoose = require('mongoose');

const NurseProfileSchema = new mongoose.Schema({
  username: {type: String, required: true},
  gender: {type: String, required: true},
  age: {type: Number, required: true},
  phoneNumber: {type: Number, required: true},
  Qualification: {type: String, required: true},
  Experience: {type: String, required: true},
  rate: {type: Number, required: true},
  Image: {type: String},
  delStatus: {type: Boolean, default: false, required: true},
  booking: {type: Boolean, default: false, required: true},


});

const Nurse = new mongoose.model('Nurse', NurseProfileSchema);
module.exports = Nurse;
