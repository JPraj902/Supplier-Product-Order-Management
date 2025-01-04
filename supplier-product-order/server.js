import express from 'express';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';
import cors from 'cors';

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create suppliers table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    contact TEXT NOT NULL
  )
`);

// Create orders table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplierId INTEGER,
    productId INTEGER,
    quantity INTEGER,
    total REAL,
    timestamp TEXT,
    FOREIGN KEY (supplierId) REFERENCES suppliers(id)
  )
`);

// API endpoint to get suppliers
app.get('/suppliers', (req, res) => {
  db.all('SELECT * FROM suppliers', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// API endpoint to add a new supplier
app.post('/suppliers', (req, res) => {
  const { name, contact } = req.body;
  db.run(
    'INSERT INTO suppliers (name, contact) VALUES (?, ?)',
    [name, contact],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, name, contact });
    }
  );
});

// API endpoint to get orders
app.get('/orders', (req, res) => {
  db.all('SELECT * FROM orders', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// API endpoint to add a new order
app.post('/orders', (req, res) => {
  const { supplierId, productId, quantity, total, timestamp } = req.body;
  db.run(
    'INSERT INTO orders (supplierId, productId, quantity, total, timestamp) VALUES (?, ?, ?, ?, ?)',
    [supplierId, productId, quantity, total, timestamp],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, supplierId, productId, quantity, total, timestamp });
    }
  );
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
