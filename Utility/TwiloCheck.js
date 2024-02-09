const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

function verifyOtp(otp,phoneNumber) {
    client.verify.v2.services("VA3340eba94928a737825de97c8b40d169")
      .verificationChecks
      .create({ to:  phoneNumber , code:  otp })
      .then((verification_check) => console.log(verification_check.status));
  }

  module.exports = verifyOtp
