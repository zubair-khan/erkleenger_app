const allowed_methods = ["POST","GET"];
module.exports = function(req, res, next){
    req.statusMessage = null;
    req.req_start_time = new Date().toISOString();
    const method = String(req.method).trim().toUpperCase();
    if(method === "OPTIONS"){return next(200);}
    else if(!allowed_methods.includes(method)){return next(405);}
    return next();
};
