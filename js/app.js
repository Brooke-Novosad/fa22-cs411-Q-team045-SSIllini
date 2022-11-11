// from https://austinhale.medium.com/building-a-node-api-with-express-and-google-cloud-sql-9bda260b040f

require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./connect');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../')))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', '/index.html'));
});

app.route('/create')
.post(function(req, res, next) {

  var login = req.body.login
  var habit = req.body.habit
  var time = new Date().toISOString().slice(0, 19).replace('T', ' ')

  var sql = `INSERT INTO History (Habit, Student, Time) VALUES(${habit}, \"${login}\", \'${time}\'); 
            INSERT IGNORE INTO Classes_Habits (Habit, Student, Time) VALUES(${habit}, \"${login}\", \'${time}\');
            SELECT Item into @new_item FROM Inventory ORDER BY RAND() LIMIT 1;
            INSERT IGNORE INTO Inventory(Item, Student) VALUES(@new_item, \"${login}\")`

  console.log(login, habit, sql)

  connection.query(
    sql, function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }

  );
});

app.route('/search')
  .post(function(req, res, next) {

    var login = req.body.login
    var sql = `SELECT * FROM Inventory WHERE Student = \"${login}\"`

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
    var name = req.body.name

    var sql = `UPDATE Students
                SET Name = \"${name}\"
                WHERE Login = \"${login}\";`

    console.log(login, name, sql)

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

    var sql = `DELETE FROM Inventory WHERE Student = \"${login}\" AND Item LIKE \"%${item}%\"`

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

    var sql = `SELECT y.Habit, COUNT(y.Time) 
                FROM History y JOIN Classes_Habits h ON y.Student = h.Student AND y.Habit = h.Habit 
                WHERE h.Student = \'${login}\' GROUP BY y.Habit`

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

    var sql = `SELECT A.Item, COUNT(Student) / (SELECT COUNT(*) FROM Students) AS rarity
                FROM Inventory i JOIN ( SELECT DISTINCT Item FROM Inventory WHERE Student = \'${login}\' ) AS A 
                ON i.Item = A.item GROUP BY A.Item`

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