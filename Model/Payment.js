/* eslint-disable new-cap */
require('mongoose');

const Payment = new mongoose.Schema({
  orderId: {type: String, required: true},
  paymentId: {type: String, required: true},
  amount: {type: String, required: true},
  status: {type: String, required: true},
});

const paymentDetails = new mongoose.model('payments', Payment);

module.exports = paymentDetails;
