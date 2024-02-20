const generateRandomString = function (length) {
    length = parseInt(length) || 10;
    let char_set = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    char_set = char_set.repeat(length);
    char_set = char_set.split("").sort(function () { return 0.5 - Math.random(); }).join("");
    return char_set.substr(0, length);
};
module.exports = {
    generateRandomString
};
