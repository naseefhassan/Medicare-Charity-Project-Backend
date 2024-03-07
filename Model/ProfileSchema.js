/* eslint-disable new-cap */
const mongoose=require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {type: String},
  username: {type: String, required: true},
  gender: {type: String, required: true},
  age: {type: String, required: true},
  phoneNumber: {type: String, required: true},
});

const profile = new mongoose.model('profiles', ProfileSchema);

module.exports=profile;
