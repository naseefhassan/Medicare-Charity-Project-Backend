const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

module.exports = function sentOtp(phoneNumber) {
    client.verify.v2.services('VA3340eba94928a737825de97c8b40d169')
                .verifications
                .create({to:`+91 ${phoneNumber}`, channel: 'sms'})
                .then(verification => console.log(verification.status));

};
