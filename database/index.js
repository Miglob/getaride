const sql = require('mysql');
let config = require('./config.json');

var connection = sql.createConnection({

});

module.exports = {
    ...require('./getaride')(connection),
}