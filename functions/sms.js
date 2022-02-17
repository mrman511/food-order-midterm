const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = function () {
  client.messages
    .create({
      body: "Your order will be ready in 20 minutes!",
      from: `+1${process.env.MY_TWILIO_NUMBER}`,
      to: `+1${process.env.PHONE_NUMBER}`,
    })
    .then((message) => console.log(message.sid));
};

module.exports = { sendSMS };
