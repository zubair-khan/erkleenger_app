const multer = require("multer");
const responseH = require("./../utils/response");
const Exception = require("./../utils/exceptions");
// const custom_exceptions = require("./../utils/custom_exceptions.json");
const ooredoo_exceptions = require("./../utils/ooredoo_exceptions.json");
const sequelize = require("./../sequelize/sequelize");
//--//
const uc_words = function (str) { return String(str).trim().toLowerCase().replace(/\b[a-z]/g, function (s) { return s.toUpperCase(); }); };
const setField = function (field) {
    field = String(field || "").trim();
    field = field.replace("_", " ");
    field = field.replace("_", " ");
    return field;
};
const setErrorMessage = function (error) {
    let message;
    if (error && error["validatorKey"]) {
        let key = String(error["validatorKey"]);
        let path = uc_words(setField(error.path));
        let value = String(error["value"]);
        switch (key) {
            case "min":
                message = `Please enter positive integer value for ${path}`;
                break;
            case "isIn":
                message = `Please enter valid value for ${path}`;
                break;
            case "isInt":
                message = `Please enter valid integer value for ${path}`;
                break;
            case "isDate":
                message = `Please enter valid date for ${path}`;
                break;
            case "notNull":
                message = `${path} is required, and can not be empty`;
                break;
            case "isEmail":
                message = `Please enter valid email address for ${path}`;
                break;
            case "isUnique":
                message = `${path} '${value}' is already taken`;
                break;
            case "notEmpty":
                message = `${path} can not be empty`;
                break;
            default:
                message = error.message;
                break;
        }
    }
    return message;
};
//--//
module.exports = async function (data, req, res, next) {
    let console_error = true;
    let response = new responseH();
    //--//
    if (data && !isNaN(data)) {
        response.setError(data, Exception(data), data);
        console_error = false;
    }
    else if (data && data instanceof sequelize.sequelize.ValidationError) {
        console_error = false;
        let error = data.errors[0];
        response.setError(error, Exception(422), 422);
        response.message = error.message;
        response.message = setErrorMessage(error);
    }
    else if (data && data instanceof sequelize.sequelize.ValidationErrorItem) {
        console_error = false;
        let error = data.errors[0];
        response.setError(error, Exception(422), 422);
        response.message = error.message;
        response.message = setErrorMessage(error);
    }
    else if (data && data instanceof sequelize.sequelize.SequelizeScopeError) {
        response.setError(data, Exception(400), 400);
    }
    else if (data && data instanceof sequelize.sequelize.DatabaseError) {
        response.setError(data, Exception(400), 400);
    }
    else if (data && data instanceof sequelize.sequelize.InstanceError) {
        response.setError(data, Exception(400), 400);
    }
    else if (data && data instanceof multer.MulterError) {
        response.setError(data, Exception(411), 411);
    }
    else if (data && data instanceof sequelize.sequelize.BaseError) {
        response.setError(data.message, Exception(500), 500);
    }
    else if (data && data instanceof TypeError) {
        let errorCode = data && data.code || 412;
        let message = ooredoo_exceptions.code[data.message] && ooredoo_exceptions.code[data.message].message ? ooredoo_exceptions.code[data.message].message : data.message
        let code = ooredoo_exceptions.code[data.message] && ooredoo_exceptions.code[data.message].code ? ooredoo_exceptions.code[data.message].code : errorCode
        let errorData = ooredoo_exceptions.code[data.message] && ooredoo_exceptions.code[data.message].data ? ooredoo_exceptions.code[data.message].data : {}
        response.setError(code, message, code, errorData);
    }
    else if (data && data instanceof Error) {
        response.setError(data.message, Exception(500), 500);
    }
    else {
        response.setSuccess(data, Exception(200), 200);
        console_error = false;
    }
    //--//
    if (response.status === "error") {
        if (console_error) { console.log(data); }
    }
    //--//
    response.sendRes(req, res);
    return next();
};
