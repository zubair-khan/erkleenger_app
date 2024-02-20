const solrConfig = require('../config/solrConfig');


const performUpsert = (core, query) => {
    var client = solrConfig.configuration(core);
    let result = {};
    let queryObj = client.query().q(query);
    client.update(queryObj, function(err, result) {
        if(err){
        console.log(err);
        return result;
        }
        console.log('Response:', result.response.docs);
        result = result.response.docs;
        return result;
    });
};
const getDocumentCount = async (core, query) =>{
    try{
        var client = await solrConfig.configuration(core);
        let queryObj = client.query().q(query);
        let response = await client.search(queryObj)
        return response.response.numFound;
    }catch(error){
        return error
    }
};
const performSearch = async (core, query, start = 0, rows = 10) =>{
    try{
        var client = await solrConfig.configuration(core);
        let queryObj = client.query().q(query).start(start).rows(rows);
        let response = await client.search(queryObj)
        return response.response.docs;
    }catch(error){
        return error
    }
};
const performSearchString = async (core, query) =>{
    try{
        var client = await solrConfig.configuration(core);
        let response = await client.search(query)
        return response.response.docs;
    }catch(error){
        return error
    }
}
module.exports = {
    performUpsert,
    performSearch,
    performSearchString,
    getDocumentCount
}