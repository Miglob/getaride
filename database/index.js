const sql = require('mysql');
let config = require('./config.json');

var connection = sql.createConnection(config);
connection.connect();

module.exports = {
    ...require('./getaride')(connection),
}