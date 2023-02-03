const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'vulnerable_db',
});

connection.connect();

const payload = '"" UNION SELECT SLEEP(10)';

app.get('/', (req, res) => {
  connection.query(
    `SELECT * FROM users WHERE name = ${payload}`,
    (err, rows, fields) => {
      console.log(err);
      console.log('The solution is: ', rows);
      res.json(rows);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

