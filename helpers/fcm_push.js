const fcm_json = require("./../config/fcm.json");
const FCM_NODE = require("fcm-node");
// const FCM = new FCM_NODE(fcm_json);
//--//
const send_push = function (message) {
    console.log("sending fcm push! please wait...");
    FCM.send(message, function (err, data) {
        if (err) { console.log("fcm push not sent", err); }
        if (data) { console.log("fcm push sent", data.results, message.data || message.notification); }
    });
};
//--//
const send_logs = async (obj, sequelize) => {
    let app_logs_instance = new sequelize.db(sequelize.models.app_logs);
    let [app_log_data, app_log_err] = await app_logs_instance.create(obj);
    if (app_log_err) { console.log("app_log_err", app_log_err); }
}
//--//
module.exports = {
    send_push,
    send_logs,
};