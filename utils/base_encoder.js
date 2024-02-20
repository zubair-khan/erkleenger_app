let data_set = "";
// data_set = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
data_set = data_set.split("").sort(function(){return 0.5 - Math.random();}).join("");
data_set = "bhjglyoqck829uf513z4i06xvtmrew7pnasd";
// console.log("base Encode Data Set", data_set);
//--//
const encode = function(number){
    let base = (data_set).split("").length;
    number = parseInt(number) || 0;
    let encoded = "";
    while(number){
        encoded = data_set[number % base] + encoded;
        number = Math.floor(number / base);
    }
    return encoded;
};
const decode = function(string){
    let base = (data_set).split("").length;
    string = String(string).trim().split("");
    let this_length = (string).length;
    let decoded = 0;
    let loop = 0;
    while(this_length--){
        decoded += data_set.indexOf(string[loop++]) * Math.pow(base, this_length);
    }
    return decoded;
};
//--//
module.exports = {encode, decode};
//--//
// var encoded = encode(999999999999999);
// console.info("encoded", encoded);
// var decoded = decode(encoded);
// console.info("decoded", decoded);
