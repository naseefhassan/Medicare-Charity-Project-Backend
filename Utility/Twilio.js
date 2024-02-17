const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


function sentOtp(phoneNumber) {
  try {
    client.verify.v2
        .services(process.env.TWILIO_SERVICE_ID)
        .verifications.create({to: `+91 ${phoneNumber}`, channel: 'sms'})
        .then((verification) => console.log(verification.status))
        .catch((error)=> console.log('error ', error));
  } catch (error) {
    console.log('Error from twilio', error);
  }
}


module.exports = sentOtp;
