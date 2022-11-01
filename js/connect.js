// from https://gist.githubusercontent.com/austinhale/c7d0ba1299ab0891e90834523aa62b02/raw/050d1fdfc03831bb0c2381a32fe67efbeff310bd/medium-mysql-connection-example.js

const mysql = require('mysql');

// Database Connection for Production

// let config = {
//     user: process.env.SQL_USER,
//     database: process.env.SQL_DATABASE,
//     password: process.env.SQL_PASSWORD,
// }

// if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
//   config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
// }

// let connection = mysql.createConnection(config);

// Database Connection for Development

let connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "habit_tracker",
  password: "hello"
});

connection.connect(function(err) {
if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
}
console.log('Connected as thread id: ' + connection.threadId);
});

module.exports = connection;

// test connection
connection.query(
    'SELECT * FROM Students LIMIT 10', function(err, result, fields){
        if (err) throw err;
        console.log(result);
    }
);