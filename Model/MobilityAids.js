/* eslint-disable new-cap */
const mongoose = require('mongoose');

const MobilityAids = new mongoose.Schema({
  Item: {type: String, required: true},
  Brand: {type: String, required: true},
  Color: {type: String, required: true},
  Material: {type: String, required: true},
  Rate: {type: Number, required: true},
  Description: {type: String, required: true},
  Image: {type: String, required: true},
});

const mobilityAids = new mongoose.model('MobilityAids', MobilityAids);

module.exports = mobilityAids;
