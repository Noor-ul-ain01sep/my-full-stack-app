const mysql = require('mysql');

// Create Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to Database
db.connect(function(err) {
  if (err) throw err;
  console.log('Successfully Connected to Database');
});

// Create Express app
const express = require('express');
const app = express();

app.use(express.json());

// Read Books
app.get('/', (req, res) => {
  const query = 'SELECT * FROM books';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Adding Books
app.post('/', (req, res) => {
    const { title, author, no_of_pages, published_at } = req.body;
    const query = 'INSERT INTO books (title, author, no_of_pages, published_at) VALUES (?, ?, ?, ?)';
    db.query(query, [title, author, no_of_pages, published_at], (err, results) => {
      if (err) {
        console.error('Error adding book:', err.message);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      res.json({ id: results.insertId });
    });
});

// Update Book
app.put('/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, author, no_of_pages, published_at } = req.body;
    const query = 'UPDATE books SET title = ?, author = ?, no_of_pages = ?, published_at = ? WHERE id = ?';
    db.query(query, [title, author, no_of_pages, published_at, bookId], (err, results) => {
        if (err) {
            console.error('Error updating book:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book updated successfully' });
    });
});

// Delete Book
app.delete('/:id', (req, res) => {
    const bookId = req.params.id;
    const query = 'DELETE FROM books WHERE id = ?';
    db.query(query, [bookId], (err, results) => {
        if (err) {
            console.error('Error deleting book:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    });
});

module.exports = app;
