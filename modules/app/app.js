const express = require("express");
const authChecker = require("../../middleware/auth_checker");
//--//
let routes = function () {
    const router = express();
    let handler = async function (req, res, next) {
        req.portalID = "adminPortal";
        return next();
    };
    router.use(handler);
    //--//
    // router.use("/", require("./../../modules/common/app")());


    router.use("/", require("./routes/imap")());
    //--//
    return router;
};
module.exports = routes;
