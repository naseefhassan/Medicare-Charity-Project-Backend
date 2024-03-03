/* eslint-disable new-cap */
const mongoose = require('mongoose');

const Ambulance = new mongoose.Schema({
  ownerName: {type: String, required: true},
  email: {type: String, required: true},
  phoneNumber: {type: Number, required: true},
  vehicleNumber: {type: String, required: true},
  vehicleGrade: {type: String, required: true},
  vehicleModel: {type: String, required: true},
  image: {type: String, required: true},
});

const ambulance = new mongoose.model('Ambulance', Ambulance);

module.exports = ambulance;
