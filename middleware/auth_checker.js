const configJSON = require('../config/config.json')
const envJson = require("../helpers/env.json")

module.exports = function (type) {
    return async function (req, res, next) {
        try {
            let token = req.headers.authorization;
            let auth = envJson[process.env.NODE_ENV].auth;
            console.log("type: ", type);
            if (token) {
                if (type === "app") {
                    if (token === "ERK!and$") { next(); } else { next(401); }
                } else {
                    return next(401);
                }
            } else {
                return next(401);
            }
        } catch (error) {
            console.log("authorization error", error);
            let error_name = error.name;
            next({
                status: 401,
                message: "Authentication failed due to " + error_name,
                error: error
            });
        }
    };
};


// module.exports = function (access) {
//     return function (req, res, next) {
//         try {
//             access = String(access).trim().toLowerCase().split(',');
//             if ((!req.appUser || !req.appUser.id)) {
//                 return next(403);
//             }
//             let accessGranted = false;
//             for (let i = 0; i < access.length; i++) {
//                 if (req.appUser.role_id == configJSON.roles[`${access[i]}`]) {
//                     accessGranted = true
//                     break;
//                 }
//             }
//             if (!accessGranted) {
//                 return next(403)
//             }
//             return next();
//         }
//         catch (error) { return next(error); }
//     };
// };