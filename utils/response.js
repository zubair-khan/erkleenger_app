const crypto = require("./../utils/crypto");
//--//
module.exports = class{
    constructor(){
        this.status = null;
        this.statusCode = null;
        this.message = null;
        this.data = {};
        this.error = {};
    };
    setSuccess(data, message, statusCode){
        this.status = "success";
        this.statusCode = statusCode || 200;
        this.message = message || "OK";
        this.data = data;
        this.error = {};
        return this;
    };
    setError(error, message, statusCode, data = null){
        this.status = "error";
        this.statusCode = statusCode || 500;
        this.message = message || "Error";
        this.data = data;
        this.error = error;
        return this;
    };
    sendRes(req, res){
        let result = {
            status: this.status,
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
            error: this.error
        };
        if(req.statusMessage && req.statusMessage !== ""){result.message = req.statusMessage;}
        // if(!server_config.enc_enabled){req.enc_password = "";}
        // if(req.enc_password && req.enc_password !== ""){
        //     let password = req.enc_password;
        //     if(result.data){
        //         result.data = JSON.stringify(result.data);
        //         result.data = crypto.encrypt(result.data, password);
        //     }
        //     else if(result.error){
        //         result.error = JSON.stringify(result.error);
        //         result.error = crypto.encrypt(result.error, password);
        //     }
        // }
        res._body = result;
        // console.log("result=++++++++++++++++++++++++++++++++", result);
        return res.status(this.statusCode).json(result);
    }
};
