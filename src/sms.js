//require('dotenv').config()


//const accountSid = 'AC264988adf5b6838ef418390021eb8ecf';
//const authToken = 'b79cd9171b109d6d6b0a34c02b31fd8d';
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID, 
  process.env.TWILIO_AUTH_TOKEN
  );
const body = 'This is a MASS test message from Twilio. Let me know (in person) if it works!';

// For multiple phone numbers:
var numbersToMessage = ["+17607032507", "+17605805403", "+18582150439", "+19492940839"]

numbersToMessage.forEach(function (number) {
  client.messages
    .create({
      body: body,
      from: process.env.TWILIO_NUMBER,
      to: number
    })
    .then(message => console.log(message.status))
    .done();
});

// For 1 phone number:
/* client.messages
  .create({
    body: 'This is a test message from Twilio. Let me know if it works!',
    from: '+18588793008',
    to: '+17607032507'
  })
  .then(message => console.log(message.sid));
 */
