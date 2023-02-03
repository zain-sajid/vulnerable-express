const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

connection.connect();

app.get('/', (req, res) => {
    res.send('Backend API is online!');
});

app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, rows, fields) => {
        console.log(err);
        console.log('The solution is: ', rows);
        res.json(rows);
    });
});

const payload = "'' OR 1=1; --";

app.get('/sqli', (req, res) => {
    connection.query(
        `SELECT name FROM users WHERE name = ${req.query.name ?? payload}`,
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
