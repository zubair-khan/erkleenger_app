const networkRequest = require("../utils/calls/networkRequest");
const databaseRequest = require("../utils/calls/networkRequest");
const authKeyFunction = require("../middleware/timweAuthKey");
var config = require('../config/config.json');
const sequelize = require("../sequelize/sequelize");
const sendSmsWithLogging = async (req, text, phone, type = 0, smsType) => {
    try {
        if (!text || text === "") {
            text = Math.floor(Math.random() * (999999 - 100000) + 100000);
        }
        let product_id = config.timweSms.SMSPRODUCT_ID;
        let pricepoint = config.timweSms.SMSPRICEPOINT;
        let largeccount = config.timweSms.SMS_LARGEACCOUNT;
        const url = config.timweSms.SENDSMSURL + 3304;
        const externalId = Math.floor(100000000 + Math.random() * 900000000);
        const authKey = await authKeyFunction.executeJavaSMS();
        const headers = {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "apikey": config.timweSms.KEY_FOR_SEND_SMS,
            "authentication": authKey,
            "external-tx-id": externalId
        }
        const body = {
            "productId": product_id,
            "pricepointId": pricepoint,
            "text": text.toString(),
            "msisdn": phone.toString(),
            "priority": "NORMAL",
            "timezone": "Asia/Qatar",
            "mcc": "427",
            "mnc": "01",
            "entryChannel": "SMS",
            "largeAccount": largeccount,
            "context": "STATELESS"
        }
        let resultData;
        const result = await networkRequest.postWithHeaders(url, null, headers, body);
        resultData = JSON.stringify(result.data);
        
        
        //----------------logs
        let SendSMS = new sequelize.models.send_sms({});
        SendSMS.sms = text;
        SendSMS.phone = phone;
        SendSMS.response = resultData;
        SendSMS.sms_type = smsType;
        SendSMS.type = type;
        SendSMS.save();
        return SendSMS;
          
    }catch(error){
        const response = {
            status: 500,
            message: "Unknown Server Error",
            data: null,
            error: error
        };
        return response;
    }
}
module.exports = {
    sendSmsWithLogging
}