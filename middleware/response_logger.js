const sequelize = require("./../sequelize/sequelize");
// const users = require("./../services/users");
module.exports = async function (req, res, next) {
    res.on("close", async function () {
        let log = {};
        log.ip = null;
        log.path = "/";
        log.user_agent = null;
        if (req.headers["x-forwarded-for"]) { log.ip = String(req.headers["x-forwarded-for"] || null).trim(); }
        if (req.headers["user-agent"]) { log.user_agent = String(req.headers["user-agent"] || null).trim(); }
        if (req.route && req.route.path) { log.path = String(req.route.path || "/").trim(); }
        log.url = String(req.url).trim();
        log.original_url = String(req.protocol + "://" + req.get("host") + req.originalUrl).trim();
        if (!req.portalID) { req.portalID = log.url.split("/")[2] || null; }
        log.portal_id = String(req.portalID || null);
        log.method = String(req.method).trim();
        //--//
        let user_id = null;
        let user_identity = [];
        if (req.appUser) {
            user_id = req.appUser ? req.appUser.id : null;
            user_identity = [req.appUser.phone, req.appUser.email];
        }
        // else if (req.body.username) {
        //     user_identity = [req.body.username];
        //     let [user, err] = await users.findUser(req.body.username);
        //     if (err) { console.log("err", err); }
        //     if (user) {
        //         user_id = user.id;
        //         user_identity = [user.phone, user.email];
        //     }
        // }
        log.admin_id = user_id;
        log.user_identity = JSON.stringify(user_identity);
        //--//
        log.req_body = JSON.stringify(req.body);
        log.req_query = JSON.stringify(req.query);
        log.req_headers = JSON.stringify(req.headers);
        log.req_raw_headers = JSON.stringify(req.rawHeaders);
        log.req_start_time = req.req_start_time;
        //--//
        log.res_body = JSON.stringify(res._body);
        log.res_status_code = String(res.statusCode);
        log.res_status_message = String(res.statusMessage);
        log.res_headers = JSON.stringify(String(res._header).trim().split("\r\n"));
        log.res_ended_time = new Date().toISOString();
        //--//
        let instance = new sequelize.db(sequelize.models.request_logs);
        let [data, err] = await instance.create(log);
        if (err) { console.log("err", err); }
    });
    return next();
};
