const express = require('express');
const mysql = require('mysql');

const app = express();

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_mysql_password',
  database: 'example_db'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected!');
});

// Define a route to retrieve all users
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// Define a route to retrieve a specific user by ID
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM users WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result[0]);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
