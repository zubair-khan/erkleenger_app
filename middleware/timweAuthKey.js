/*******************************************************/
// Importing Npm Module.
/*******************************************************/
const exec = require('child_process').exec;

/*******************************************************/
// Implementing Authentication Key.
/*******************************************************/
const executeJava = () => {
    return new Promise((resolve, reject) => {
        const child = exec('java -jar main.jar', function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            resolve(stdout);
            if (error !== null) {
                console.log('exec error: ' + error);
                reject(error);
            }
        });
    })
}
const executeJavaBundle = () => {
    return new Promise((resolve, reject) => {
        const child = exec('java -jar main_bundle.jar', function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            resolve(stdout);
            if (error !== null) {
                console.log('exec error: ' + error);
                reject(error);
            }
        });
    })
}
const executeJavaSMS = () => {
    return new Promise((resolve, reject) => {
        const child = exec('java -jar main_sms.jar', function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            resolve(stdout);
            if (error !== null) {
                console.log('exec error: ' + error);
                reject(error);
            }
        });
    })
}
module.exports = {
    executeJava,
    executeJavaBundle,
    executeJavaSMS
}