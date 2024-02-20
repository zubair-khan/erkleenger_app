"use strict";
let CryptoJS = require("node-cryptojs-aes").CryptoJS;
var crypto = require('crypto')
var keys_length = require('../config/config.json').keys_length
//--//
function md5(input) {
    return CryptoJS.MD5(input).toString();
    //console.log("password ", password);
    //return password;
}
function encrypt(input, password) {
    try {
        return CryptoJS.AES.encrypt(input, password).toString().trim() || "{}";
        //console.log("encrypted", encrypted);
        //return encrypted;
    }
    catch (e) { return "{}"; }
}
function decrypt(input, password) {
    try {
        return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(input, password)).toString().trim() || "";
        //console.log("decrypted", decrypted);
        //return decrypted;
    }
    catch (e) { return "{}"; }
}

function randomBytes() {
    try {
        return crypto.randomBytes(keys_length.reset_password_token).toString('hex');
    }
    catch (e) { return "{}"; }
}


/*function run(){
    console.info("\n");
    let password = md5("Sm7Rlg");
    let phrase = JSON.stringify({
        "username": "bilal.jafar.jafar@gmail.com",
        "password": "abc123"
    });
    decrypt(encrypt(phrase, password), password);
}
//run();*/
//--//
module.exports = {
    encrypt,
    decrypt,
    randomBytes
};
