/*******************************************************/
// Importing Files.
/*******************************************************/
/*******************************************************/
const axios = require("axios");
//*******************************************************/
//Network Requests.
/*******************************************************/
const post = async (url, body) => {
    return await axios.post(url, body, {
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    });
}
const getWithoutReq = async (url)=>{
    const headers = {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
    }
    console.log("Request URL", url);
    return await axios.get(url,
        {
            headers: headers
        }
    ).then((result)=>{
        return result;
    }).catch((err)=>{
        return err.response;
    });
}
const get = async (url, req) => {
    const user_interested_tag = req.query.id;
    let params = "";
    let id = "";
    if (user_interested_tag != undefined) {
        params = {
            id: user_interested_tag
        };
        id = user_interested_tag;
    }
    let index = 1;
    let index2 = 20;
    if (req.headers.index != "") {
        let index = req.headers.index;
    }
    if (req.headers.index2 != "") {
        let index2 = req.headers.index2;
    }
    //----------------------//
    let app_id = parseInt(req.headers.app_id) || 0;
    if (app_id && app_id > 0) {
        app_id = app_id;
    }
    else {
        app_id = 1;
    }
    //--------------------------//
    const headers = {
        "Content-Type": 'application/json',
        "Accept": '*/*',
        "Authorization": req.headers.authorization,
        "app_id": app_id,
        "index": index,
        "index2": index2,
        "id": id
    };
    console.log("V1 Request URL", url);
    return await axios.get(url,
        {
            headers: headers
        },
        {
            params: params
        }
    ).then((result) => {
        return result;
    }).catch((err) => {
        return err.response;
    });
}
const getWithParams = async (url, req, params = "") => {
    let index = 1;
    let index2 = 20;
    if (req.headers.index != "") {
        let index = req.headers.index;
    }
    if (req.headers.index2 != "") {
        let index2 = req.headers.index2;
    }
    //----------------------//
    let app_id = parseInt(req.headers.app_id) || 0;
    if (app_id && app_id > 0) {
        app_id = app_id;
    }
    else {
        app_id = 1;
    }
    //--------------------------//
    const headers = {
        "Content-Type": 'application/json',
        "Accept": '*/*',
        "Authorization": req.headers.authorization,
        "app_id": app_id,
        "index": index,
        "index2": index2
    };
    let config = {
        headers: headers,
        params: params,
    }
    return await axios.get(url,
        config
    ).then((result) => {
        return result;
    }).catch((err) => {
        return err.response;
    });
}
const postWithHeaders = async (url, req, headers, body) => {
    let config = {
        headers: headers
    }
    return await axios.post(url, body,
        config
    ).then((result) => {
        return result;
    }).catch((err) => {
        return err.response;
    });
}
const putWithHeaders = async (url,req,headers,body) => {
    let config = {
        headers: headers
      }
    return await axios.put(url,body,
        config
    ).then((result)=>{
        return result;
    }).catch((err)=>{
        return err.response;
    });
}
const getWithHeaders = async (url, headers)=>{
    let config = {
        headers: headers
      }
    console.log("Request URL", url);
    return await axios.get(url,config
    ).then((result)=>{
        return result;
    }).catch((err)=>{
        return err.response;
    });
}
/*******************************************************/
// Exporting.
/*******************************************************/
module.exports = {
    post,
    get,
    getWithParams,
    postWithHeaders,
    getWithoutReq,
    putWithHeaders,
    getWithHeaders,
}
