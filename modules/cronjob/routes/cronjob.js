const express = require("express");
const cronjobController = require("../controllers/cronjob");
const authChecker = require("../../../middleware/auth_checker");
// Validation Rules

//--//
let routes = function () {
    let routes = express.Router({ mergeParams: true });
    let accessRoles = "authForAll";
    //--//
    
    routes.route("/voucherExpiredNotfication7daysBefore").get(authChecker(accessRoles), cronjobController.voucherExpiredNotfication7daysBefore);
    routes.route("/voucherExpiredNotfication3daysBefore").get(authChecker(accessRoles), cronjobController.voucherExpiredNotfication3daysBefore);
    routes.route("/voucherExpiredNotfication1dayBefore").get(authChecker(accessRoles), cronjobController.voucherExpiredNotfication1dayBefore);
    return routes;
};
//--//
module.exports = routes;
