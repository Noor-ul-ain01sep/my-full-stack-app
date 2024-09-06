import React, { useState, useEffect } from 'react';
import '../../style/style.css';

const Read = () => {
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
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className='Books_title text-uppercase text-center display-3 fw-bold mb-4' >Read Books</h1>
      <div className="row">
        {books.map((book) => (
          <div className="col-md-4 mb-3" key={book.id}>
            <div className="card bg-light">
              <div className="card-body">
                <h5 className="card-title text-center display-6 fw-bold text-uppercase"><span className='fw-bold'>{book.title}</span></h5>
                <h6 className="card-subtitle mb-2 fs-4 ">Author:<span className='fw-bold '>{book.author}</span></h6>
                <p className="card-text fs-5">Pages: <span className='fw-bold'>{book.no_of_pages}</span></p>
                <p className="card-text fs-6">Published Date: <span className='fw-bold'>{book.published_at}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReadBooks = () => {
  return (
    <div className='CURD_Books container-fluid d-flex flex-column align-items-center justify-content-center'>
      <Read />
    </div>
  );
};

export default ReadBooks;
