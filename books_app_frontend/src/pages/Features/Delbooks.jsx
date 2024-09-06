import React, { useState, useEffect } from 'react';
import '../../style/style.css';

const DeleteBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://my-full-stack-app-one.vercel.app/api/books');
      if (!response.ok) throw new Error('Network Problem');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDeleteClick = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`https://my-full-stack-app-one.vercel.app/api/books/${bookId}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error("Network Problem");
        alert('Book deleted successfully');
        fetchTasks();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  return (
    <div className='container'>
      <h1 className='Books_title text-uppercase text-center display-3 fw-bold mb-4' >Delete Books</h1>
      <div className='table-responsive-sm'>
      <table className='table table-bordered  table-striped table-hover '>
        <thead>
          <tr className='fs-3 '>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Published At</th>
            <th className='d-flex justify-content-center align-items-center' >Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className='fs-4'>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.no_of_pages}</td>
              <td>{book.published_at}</td>
              <td className='d-flex justify-content-center align-items-center'>
                <button type='button' className='btn_Feature fw-bold p-2' onClick={() => handleDeleteClick(book.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

const DeleteBooksPage = () => {
  return (
    <div className='CURD_Books container-fluid d-flex flex-column align-items-center justify-content-center'>
      <DeleteBooks />
    </div>
  );
};

export default DeleteBooksPage;
