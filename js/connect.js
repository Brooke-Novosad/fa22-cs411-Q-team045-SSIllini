// from https://austinhale.medium.com/building-a-node-api-with-express-and-google-cloud-sql-9bda260b040f
//      https://gist.githubusercontent.com/austinhale/c7d0ba1299ab0891e90834523aa62b02/raw/050d1fdfc03831bb0c2381a32fe67efbeff310bd/medium-mysql-connection-example.js

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

//https://www.itsolutionstuff.com/post/node-js-express-form-submission-exampleexample.html
//some info on forms connecting to node.js

//create login
//https://codeshack.io/basic-login-system-nodejs-express-mysql/

//we also might need to restructure the files
//https://www.learnhowtoprogram.com/user-interfaces/building-layouts-preprocessors/multi-page-html-sites

//express seems to be the easiest way to connect a button to node js

//https://stackoverflow.com/questions/51820984/linking-html-button-to-node-js-post

//https://www.w3docs.com/snippets/nodejs/how-to-redirect-a-web-page-with-node-js.html
//more redirections




// Database Connection for Development

let connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "habit_tracker",
  password: "hello",
  multipleStatements: true
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
// connection.query(
//     'SELECT * FROM Students LIMIT 10', function(err, result, fields){
//         if (err) throw err;
//         console.log(result);
//     }
// );