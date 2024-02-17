const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function verifyOtp(otp, phoneNumber) {
  return new Promise((resolve, reject) => {
    client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
        .verificationChecks
        .create({to: phoneNumber, code: otp})
        .then((verification_check) => {
          resolve(verification_check.status);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

module.exports = verifyOtp;
