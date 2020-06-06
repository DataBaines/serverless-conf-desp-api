const dbConfig = require('./dbconfigmysql');
const mysql = require('serverless-mysql')({
    config: dbConfig,
    debug: true
});

module.exports = mysql;
