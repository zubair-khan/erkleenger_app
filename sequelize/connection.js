let connection = null;
let sequelize = require("sequelize");
// let config = require("./../config/db");
let config = require("./../config/config.json");
require('dotenv').config()

//--// 
sequelize.DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
    return date.format("YYYY-MM-DD HH:mm:ss");
};

if (process.env.NODE_ENV == 'localhost') {
    if (!connection) { connection = new sequelize(config.localhost.name, config.localhost.user, process.env.DB_PASSWORD, config.localhost); }
}else if (process.env.NODE_ENV == 'internal') {
    if (!connection) { connection = new sequelize(config.internal.name, config.internal.user, config.internal.pass, config.internal); }
}else if (process.env.NODE_ENV == 'staging') {
    if (!connection) { connection = new sequelize(config.staging.name, config.staging.user, config.staging.pass, config.staging); }
}
 else if (process.env.NODE_ENV == 'production') {
    if (!connection) { connection = new sequelize(config.production.name, config.production.user, config.production.pass, config.production); }
} else if (process.env.NODE_ENV == 'demo') {
    if (!connection) { connection = new sequelize(config.demo.name, config.demo.user, config.demo.pass, config.demo); }
}else {
    if (!connection) { connection = new sequelize(config.production.name, config.production.user, config.production.pass, config.production); }
}

module.exports = {
    config,
    sequelize,
    connection
};
