const sequelize = require("../sequelize/sequelize");
const Pagination = require("../helpers/pagination");
const Op = sequelize.sequelize.Op;
const configJSON = require('../config/config.json')
// const tenants = require("../services/tenants");
const keys_length = require("../config/config.json").keys_length;
const base_encoder = require("../utils/base_encoder");
const crypto = require("../utils/crypto");

var https = require('https');
var AWS = require('aws-sdk');
AWS.config.update({
    'region': 'eu-west-1'
});

const handle = function (promise) {
    return promise
        .then(function (data) { return Promise.resolve([data, undefined]); })
        .catch(function (error) { return Promise.resolve([undefined, error]); });
};

const radians = function (degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

const geo_distance = function (lat1, lng1, lat2, lng2){
    return parseFloat((6371 * Math.acos(Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.cos(radians(lng2) - radians(lng1)) + Math.sin(radians(lat1)) * Math.sin(radians(lat2)))).toFixed(2));

}

module.exports = {handle, geo_distance}