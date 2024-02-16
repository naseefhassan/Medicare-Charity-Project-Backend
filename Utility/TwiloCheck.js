const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

function verifyOtp(otp) {
  
  client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
      .verificationChecks
      .create({ to:  phoneNumber , code:  otp })
      .then((verification_check) => console.log(verification_check.status));
  }

  module.exports = verifyOtp
