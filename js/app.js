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

  var sql = `INSERT INTO History (Habit, Student, Time) VALUES(${habit}, \'${login}\', \'${time}\')`

  connection.query(
    sql, function(error, results, fields) {
      if (error) throw error;
      
      var html = `<!DOCTYPE html><html><head><link href="../style.css" rel="stylesheet" type="text/css"/>
      <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'></head><body><h1>Succesfully checked into habit <span style="color:pink">${habit}</span> for <span style="color:pink">${login}</span> at <span style="color:pink">${time}</span></h1></body></html>`
      res.send(html);
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
        var html = `<!DOCTYPE html><html><head><link href="../style.css" rel="stylesheet" type="text/css"/>
        <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'></head><body><h1>Inventory of ${login}</h1></body></html>`
        var str = `<table> <tr><th>Items Owned</th></tr>`
        var row = ""
        for (let i = 0; i < results.length; i++) {
            row = row + '<tr><td>' + results[i].Item + '</td></tr>'
        }
        str = str + row + '</table>'
        res.send(html + str);
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

    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        var html = `<!DOCTYPE html><html><head><link href="../style.css" rel="stylesheet" type="text/css"/>
      <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'></head><body><h1>Succesfully changed name of <span style="color:pink">${login}</span> to <span style="color:pink">${name}</span>.</h1></body></html>`
        res.send(html);
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
        var html = `<!DOCTYPE html><html><head><link href="../style.css" rel="stylesheet" type="text/css"/>
      <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'></head><body><h1>Succesfully deleted item <span style="color:pink">${item}</span> from <span style="color:pink">${login}</span>'s inventory</h1></body></html>`
        res.send(html);
      }
    );
  });

  app.route('/schedule')
  .post(function(req, res, next) {

    var login = req.body.login

    var sql = `SELECT y.Habit, COUNT(y.Time) as times
                FROM History y JOIN Classes_Habits h ON y.Student = h.Student AND y.Habit = h.Habit 
                WHERE h.Student = \'${login}\' GROUP BY y.Habit`

    console.log(login, sql)

    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        var html = `<!DOCTYPE html><html><head><link href="../style.css" rel="stylesheet" type="text/css"/>
        <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'></head><body><h1>Times ${login} has followed their habits</h1></body></html>`
        var str = `<table> <tr><th>Habit</th><th>Times Followed</th></tr>`
        var row = ""
        for (let i = 0; i < results.length; i++) {
            row = row + '<tr><td>' + results[i].Habit + '</td><td>' + results[i].times + '</td></tr>'
        }
        str = str + row + '</table>'
        res.send(html + str);
      }
    );
  });

  app.route('/rarity')
  .post(function(req, res, next) {

    var login = req.body.login

    var sql = `SELECT A.Item, COUNT(Student) / (SELECT COUNT(*) FROM Students) AS rarity
                FROM Inventory i JOIN ( SELECT DISTINCT Item FROM Inventory WHERE Student = \'${login}\' ) AS A 
                ON i.Item = A.item GROUP BY A.Item`

    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        var html = `<!DOCTYPE html><html><head><link href="../style.css" rel="stylesheet" type="text/css"/>
        <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'></head><body><h1>Rarity of ${login}'s items</h1></body></html>`
        var str = `<table> <tr><th>Item</th><th>Rarity</th></tr>`
        var row = ""
        for (let i = 0; i < results.length; i++) {
            row = row + '<tr><td>' + results[i].Item + '</td><td>' + results[i].rarity + '</td></tr>'
        }
        str = str + row + '</table>'
        res.send(html + str);
      }
    );
  });

  app.route('/procedure')
  .post(function(req, res, next) {

    var habit = req.body.habit

    var sql = `CALL sp(${habit})`

    console.log(sql)

    connection.query(
      sql, function(error, results, fields) {
        if (error) throw error;
        var html = `<!DOCTYPE html><html><head><link href="../style.css" rel="stylesheet" type="text/css"/>
        <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'></head><body><h1>Students following habit <span style="color:pink">${habit}</span></h1></body></html>`
        var str = `<table> <tr><th>Student</th><th>Item</th></tr>`
        var row = ""
        for (let i = 0; i < results[0].length; i++) {
            row = row + '<tr><td>' + results[0][i].student + '</td><td>' + results[0][i].item + '</td></tr>'
        }
        str = str + row + '</table>'
        res.send(html + str);
      }
    );
  });

app.get('/status', (req, res) => res.send('Working!'));

// Port 8080 for Google App Engine
app.set('port', 8080);
app.listen(8080);

module.exports = app;
