let nodeMailer = require('nodemailer');
const sequelize = require('../sequelize/sequelize');
let database = require('../utils/calls/databaseRequest');
let transport_options = {
    host: 'email-smtp.eu-central-1.amazonaws.com',
    port: 465,
    auth: {
        user: 'AKIAXB6OBRJBXJUNHMWI',
        pass: 'BBK8CMi0U6jEadBIuedg1QwDNsdhZcq9Q2glJxVKS5Kb'
    }
};
let transporter = nodeMailer.createTransport(transport_options);
// console.log("node mailer transporter", transporter);
module.exports = {
    sendMail: function(to, subject, html, debug){
        let options = {
            to: to,
            html: html,
            subject: subject,
            from: 'Urban Point <support@adminurban.com>'
        };
        console.log("Sending email. Please wait!...");
        if(debug && debug === true){
            console.log("Mail Options", {
                to: options.to,
                from: options.from,
                subject: options.subject
            });
        }
        transporter.sendMail(options, function(error, success){
            if(error){
                console.log("Sorry! There was some error during sending email ...");
                if(debug && debug === true){
                    console.log(error);
                }
            }
            else{
                console.log("Success! Email sent successfully!...");
                if(debug && debug === true){
                    console.log(success);
                }
            }
        });
    },
    sendEmailWithLogging:function(req, to, subject, html, type, debug){
        let options = {
            to: to,
            html: html,
            subject: subject,
            from: 'Urban Point <support@adminurban.com>'
        };
        console.log("Sending email. Please wait!...");
        if(debug && debug === true){
            console.log("Mail Options", {
                to: options.to,
                from: options.from,
                subject: options.subject
            });
        }
        // email log 
        let emailLogs = new sequelize.models.email_logs({});
        emailLogs.to = String(to);
        emailLogs.subject = subject;
        emailLogs.body = html;
        emailLogs.from = 'support@adminurban.com';
        emailLogs.type = type;
        emailLogs.save();

        // response logging 
        let sendEmailLogs =  new sequelize.models.send_email_logs({});
        sendEmailLogs.from = 'support@adminurban.com';
        sendEmailLogs.to = String(options.to) || "";
        sendEmailLogs.request = JSON.stringify(options) || "";
        sendEmailLogs.type = type;
        transporter.sendMail(options, function(error, success){
            if(error){
                console.log("Sorry! There was some error during sending email ...");
                sendEmailLogs.response = JSON.stringify(error);
                sendEmailLogs.save();
                if(debug && debug === true){
                    console.log(error);
                }
            }
            else{
                sendEmailLogs.response = JSON.stringify(success);
                sendEmailLogs.save();
                console.log("Success! Email sent successfully!...");
                if(debug && debug === true){
                    console.log(success);
                }
            }
        });
        
        
    }
};
