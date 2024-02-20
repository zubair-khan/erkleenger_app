const filter_ids = function(ids){
    ids = String(ids).trim().toLowerCase();
    ids = ids.split(" ").join("").split(",");
    if(ids && ids.length > 0){
        ids = ids.map((n) =>{ return (!isNaN(n)) ? parseInt(n) : 0;});
        ids = ids.filter(function(e, p){ return e > 0 && ids.indexOf(e) === p;});
        ids.sort();
    }
    return ids;
};
module.exports = filter_ids;
