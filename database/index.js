const sql = require('mysql');
let config = require('./config.json');

var connection = sql.createConnection(config);
connection.connect(err => {
    if (err) console.log(`Error connecting to database: ${err}`);
    else console.log(`Connected to database`);
});

connection.on('error', (err) => {
    if(err === 'PROTOCOL_CONNECTION_LOST') connection.connect();
    else throw err;
});

module.exports = {
    ...require('./getaride')(connection),
}