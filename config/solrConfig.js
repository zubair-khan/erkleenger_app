var SolrNode = require('solr-node');

// Create client

const configuration = async (core) =>{
{
    let config = 
    {
        host: 'localhost',
        // port: '8983',
        core: null,
        protocol: 'http'
    }
if(process.env.NODE_ENV == 'localhost'){
    config.host = 'localhost';
    config.port = '8983';
}else if (process.env.NODE_ENV == 'internal'){
    config.host = '172.16.0.13';
    config.user = 'solr';
    config.port = '8983';
    config.password = '_123';
}else if (process.env.NODE_ENV == 'staging'){
    config.host = 'localhost';
}else if (process.env.NODE_ENV == 'pre-production'){
    config.host = 'localhost';
}else if (process.env.NODE_ENV == 'production'){
    config.host = '172.16.0.16';
    config.port = '8983';
    config.user = 'solr';
    config.password = '_123';
}
switch(core) {
    case 'outlets':
        config.core = 'outlets';
        break;
        
    case 'outlets_parents':
        config.core = 'outlets_parents';
        break;
        
    case 'offers':
        config.core = 'offers';
        break;

    case 'users':
        config.core = 'users';
        break;

    case 'authkeys':
        config.core = 'authkeys'
        break;
        
    } 
var client = new SolrNode(config)
return client
}
}
module.exports = {
    configuration
}