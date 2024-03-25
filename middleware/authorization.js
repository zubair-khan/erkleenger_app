// const sequelize = require("./../sequelize/sequelize");
// const keys_length = require("./../config/config.json").keys_length;
// const base_encoder = require("./../utils/base_encoder");
// const config = require("./../config/config.json");
// //const solrCore = require("../helpers/solrCore");
// let axios = require('axios')
//--//
module.exports = async function (req, res, next) {
    try {
        let access_authorization = String(req.getHeader("authorization", "")).trim();
        if (access_authorization && access_authorization !== "") {
            if (!access_authorization || access_authorization.length >= 0) {
                return next();
            }
        }
        return next(401);
    }
    catch (error) {
        if (error.response && error.response.status && error.response.status == 401) {
            return next(401);
        }
        return next(error);
    }
};
