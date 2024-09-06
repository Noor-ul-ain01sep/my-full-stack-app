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

module.exports = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const handleGet = (req, res) => {
  const query = 'SELECT * FROM books';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
};

const handlePost = (req, res) => {
  const { title, author, no_of_pages, published_at } = req.body;
  const query = 'INSERT INTO books (title, author, no_of_pages, published_at) VALUES (?, ?, ?, ?)';
  db.query(query, [title, author, no_of_pages, published_at], (err, results) => {
    if (err) {
      console.error('Error adding book:', err.message);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
};

const handlePut = (req, res) => {
  const bookId = req.query.id;
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
    res.status(200).json({ message: 'Book updated successfully' });
  });
};

const handleDelete = (req, res) => {
  const bookId = req.query.id;
  const query = 'DELETE FROM books WHERE id = ?';
  db.query(query, [bookId], (err, results) => {
    if (err) {
      console.error('Error deleting book:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  });
};
