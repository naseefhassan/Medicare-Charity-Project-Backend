/* eslint-disable new-cap */
const mongoose =require('mongoose');

const VolunteerSchema= new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  phoneNumber: {type: Number, required: true},
  gender: {type: String, required: true},
  age: {type: Number, required: true},
  address: {type: String, required: true},
  district: {type: String, required: true},
  city: {type: String, required: true},
  vimage: {type: String, required: true},
});

const VolunteerCollection = new mongoose.model('volunteer', VolunteerSchema);

module.exports = VolunteerCollection;
