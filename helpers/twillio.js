const accountSid = "";
const authToken = "";
const twilio = require("twilio")(accountSid, authToken);
const handle = require("./../utils/promise_handler");
const config = require("./../config/server");
//--//
let prepend = "+966";
if(config.host === config.hosts.localhost){prepend = "+92";}
else if(config.host === config.hosts.develop){prepend = "+92";}
//--//
const send_message = function(to, sms){
    (async(to, sms) => {
        to = prepend + String(parseInt(to));
        let [message, error] = await handle(twilio.messages.create({
            to: to,
            body: sms,
            from: "e-butler"
            // from: "+"
        }));
        if(error){console.log("twilio error! sms not sent to", to, error);}
        if(message){console.log("twilio sms sent to", to);}
    })(to, sms);
};
//--//
module.exports = {send_message};
