const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Matimura@2022',
  database: 'OrderDB'
});

connection.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL as ID', connection.threadId);
});

// API endpoint to get all orders
app.get('/orders', (req, res) => {
  connection.query('SELECT * FROM OrderDetails', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch data' });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
