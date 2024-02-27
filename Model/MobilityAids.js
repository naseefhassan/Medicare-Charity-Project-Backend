/* eslint-disable new-cap */
const mongoose = require('mongoose');

const MobilityAids = new mongoose.Schema({
  item: {type: String, required: true},
  brand: {type: String, required: true},
  color: {type: String, required: true},
  material: {type: String, required: true},
  rate: {type: Number, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true},
});

const mobilityAids = new mongoose.model('MobilityAids', MobilityAids);

module.exports = mobilityAids;
