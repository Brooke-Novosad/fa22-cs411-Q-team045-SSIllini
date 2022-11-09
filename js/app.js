// from https://austinhale.medium.com/building-a-node-api-with-express-and-google-cloud-sql-9bda260b040f

require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./connect');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', '/index.html'));
});

app.route('/search/:login')
  .get(function(req, res, next) {
    console.log("\nhelp" + req.body)
    connection.query(
      "SELECT * FROM Students WHERE Login = ?", req.params.login,
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

app.get('/status', (req, res) => res.send('Working!'));

// Port 8080 for Google App Engine
app.set('port', 8080);
app.listen(8080);

module.exports = app;