const mysql = require('mysql');
const { IncomingMessage, request } = require('http');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(function(err) {
  if (err) throw err;
  console.log('Successfully Connected to Database');
});

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const query = 'SELECT * FROM books';
      db.query(query, (err, results) => {
        if (err) {
          console.error('Error fetching books:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
      });
      break;
    
    case 'POST':
      const { title, author, no_of_pages, published_at } = req.body;
      const insertQuery = 'INSERT INTO books (title, author, no_of_pages, published_at) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [title, author, no_of_pages, published_at], (err, results) => {
        if (err) {
          console.error('Error adding book:', err.message);
          return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.status(201).json({ id: results.insertId });
      });
      break;
      
    case 'PUT':
      const bookId = req.query.id;
      const { title: updateTitle, author: updateAuthor, no_of_pages: updateNoOfPages, published_at: updatePublishedAt } = req.body;
      const updateQuery = 'UPDATE books SET title = ?, author = ?, no_of_pages = ?, published_at = ? WHERE id = ?';
      db.query(updateQuery, [updateTitle, updateAuthor, updateNoOfPages, updatePublishedAt, bookId], (err, results) => {
        if (err) {
          console.error('Error updating book:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated successfully' });
      });
      break;

    case 'DELETE':
      const deleteBookId = req.query.id;
      const deleteQuery = 'DELETE FROM books WHERE id = ?';
      db.query(deleteQuery, [deleteBookId], (err, results) => {
        if (err) {
          console.error('Error deleting book:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
      });
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
