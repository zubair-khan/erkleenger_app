const express = require("express");
const imapController = require("../controllers/imap");
const authChecker = require("../../../middleware/auth_checker");
// let Uploader = require('../../../utils/uploader')
// let {uploadToBlobStorage} = require("../../../utils/uploadBlobStorage");

// let imageUploader = Uploader('image');
// let uploadSingleImage = function (file) {
//     return imageUploader.single(file);
// };
let routes = function () {
    let routes = express.Router({ mergeParams: true });
    let appAuth = "app";
    
    //--//
    routes.route("/syncInvoices").get(authChecker(appAuth), imapController.syncInvoices);
    routes.route("/getInvoices").get(authChecker(appAuth), imapController.getInvoices);
   

    return routes;
};
//--////--//
module.exports = routes;


