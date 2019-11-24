require("dotenv").config();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "What do you think?",
    from: "9712564994",
    to: "9713363132"
  })
  .then(message => console.log(message.sid));
