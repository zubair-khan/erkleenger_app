'use strict'
// Get dependencies
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
var config = require('../config/config.json')
var path = require('path');
var mime = require('mime-types');
// const fs = require("fs-extra");
AWS.config.update({
    secretAccessKey: config.aws.aws_secret_access_key,
    accessKeyId: config.aws.aws_access_key_id,
    region: config.aws.s3.region,
    useAccelerateEndpoint: config.aws.s3.useAccelerateEndpoint
});
const s3 = new AWS.S3();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + Math.random().toString(36).substring(2) + "." + mime.extension(file.mimetype));
    }
});

module.exports = type => {
    let outOfScopeExt = false;
    let allowed = [];
    if (type && type === 'image') { allowed = ['.png', '.bmp', '.ico', '.gif', '.jpg', '.jpeg']; }
    else if (type && type === 'video') { allowed = ['.mp3', '.mp4', '.gif', '.mkv', '.flv']; }
    else if (type && type === 'file') { allowed = ['.csv', '.xlsx', '.xls']; }
    //     //--//
    return multer({
        storage: storage,
        fileFilter: function (req, files, callback, next) {
            const ext = String(path.extname(files.originalname))
                .trim()
                .toLowerCase();
            if (allowed.toString().indexOf(ext) > -1) {
                if (outOfScopeExt)
                    req.multerFileUploadSuccess = false;
                else
                    req.multerFileUploadSuccess = true;
                callback(null, true);
            } else {
                outOfScopeExt = true;
                req.multerFileUploadSuccess = false;
                return callback(null, false);
            }
        },
        limits: {
            fileSize: 50 * 1024 * 1024
        }
    });
};
