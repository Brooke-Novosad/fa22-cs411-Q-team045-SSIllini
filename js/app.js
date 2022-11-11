// from https://austinhale.medium.com/building-a-node-api-with-express-and-google-cloud-sql-9bda260b040f

require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./connect');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', '/index.html'));
});

app.route('/search')
  .post(function(req, res, next) {

    var login = req.body.login
    var sql = `SELECT * FROM Students WHERE Login = \"${login}\"`

    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      }
    );
  });

  app.route('/update')
  .post(function(req, res, next) {

    var login = req.body.login
    var habit = req.body.habit
    var time = new Date()

    var sql = `INSERT INTO Classes_Habits (Habit, Student, Time) VALUES(${habit}, \"${login}\", ${time})`

    console.log(login, habit, sql)

    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      }
    );
  });

  app.route('/delete')
  .post(function(req, res, next) {

    var login = req.body.login
    var item = req.body.item

    var sql = `DELETE FROM Inventory WHERE Student = \"${login}\" AND Item LIKE \"${item}\"`

    console.log(login, item, sql)

    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      }
    );
  });

  app.route('/schedule')
  .post(function(req, res, next) {

    var login = req.body.login

    var sql = `SELECT DISTINCT h.Student, h.Habit, h.Location
                FROM Classes_Habits h JOIN History y ON y.Habit=h.Habit
                WHERE h.Student=\"${login}\"
                GROUP BY h.Habit
                ORDER BY h.Time`

    console.log(login, sql)

    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      }
    );
  });

  app.route('/rarity')
  .post(function(req, res, next) {

    var login = req.body.login

    var sql = `SELECT Item, COUNT(Student) AS rarity
                FROM Inventory
                GROUP BY Item HAVING EXISTS(SELECT Item FROM Inventory WHERE Student=\"${login}\")
                ORDER BY rarity DESC`

    console.log(login, sql)

    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      }
    );
  });

app.get('/status', (req, res) => res.send('Working!'));

// Port 8080 for Google App Engine
app.set('port', 8080);
app.listen(8080);

module.exports = app;