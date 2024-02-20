//--//
const moment = require('moment')
//--//
let dbInstance = require("./instance");
const { sequelize, connection } = require("./connection");
const Op = sequelize.Op;
//--//
const toLowerCase = function (str) {
    return String(str).toLowerCase();
};
const array_chunks = function (array, size) {
    let results = [];
    while (array.length) { results.push(array.splice(0, size)); }
    return results;
};
const uc_words = function (str) { return String(str).trim().toLowerCase().replace(/\b[a-z]/g, function (s) { return s.toUpperCase(); }); };
//--//
const employeeAccessRoles = ["employee"];
const fundManagerAccessRoles = ["fund-manager", "fund-maker", "fund-checker", "fund-portfolio-manager"];
const adminAccessRoles = ["admin", "tpl-maker", "tpl-checker", "tpl-viewer"];
const employerAccessRoles = ["employer", "emp-maker", "emp-checker", "emp-finance"];
//--//

//--//
module.exports = function (db) {
    //--//
  };
