let { config, sequelize, connection } = require("./connection");
//--//
let models = {
    app_invoices: (require("../schemas/app_invoices"))(connection, sequelize)
};
//--//
(require("./hooks"))(models);
(require("./scopes"))(models);
(require("./associations"))(models);
//--//
let instance = require("./instance");
module.exports = {
    config,
    sequelize,
    connection,
    models,
    db: instance
};
