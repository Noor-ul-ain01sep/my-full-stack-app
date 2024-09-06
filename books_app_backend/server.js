const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 8081;

app.use(express.json());
app.use(cors());

// Create Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bookshelf'
});

// Connect to Database
db.connect(function(err) {
  if (err) throw err;
  console.log('Successfully Connected to Database');
});

// Default Route
app.get('/', function(req, res) {
  res.send('Welcome to Books Shelf Website Application');
});

// Read Books
app.get('/books', (req, res) => {
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
app.post('/books', (req, res) => {
    const { title, author, no_of_pages, published_at } = req.body;
    const query = 'INSERT INTO books (title, author, no_of_pages, published_at) VALUES (?, ?, ?, ?)';
    db.query(query, [title, author, no_of_pages, published_at], (err, results) => {
      if (err) {
        console.error('Error adding book:', err.message); // Log the error message
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      res.json({ id: results.insertId });
    });
  });
  

// Update Book
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, author, no_of_pages, published_at } = req.body;
    const query = ` UPDATE books SET title = ?, author = ?, no_of_pages = ?, published_at = ? WHERE id = ? `;
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



// Delete book
app.delete('/books/:id', (req, res) => {
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

// Port Number
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
