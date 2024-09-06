import React, { useState, useEffect } from 'react';
import '../../style/style.css';

const Update = () => {
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditClick = (book) => {
    setEditId(book.id);
    setEditData(book);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`https://my-full-stack-app-one.vercel.app/api/books/${editId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData)
      });
      if (!response.ok) throw new Error("Network Problem");
      alert('Book updated successfully');
      fetchTasks();
      setEditId(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className='container'>
        <h1 className='Books_title text-uppercase text-center display-3 fw-bold mb-4' >Update Books</h1>
        <div className='table-responsive-sm'>
      <table className='table table-bordered table-striped table-hover'>
        <thead>
          <tr className='fs-3'>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Published At</th>
            <th className='d-flex justify-content-center align-items-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className='fs-4'>
                {editId === book.id ? (
                  <input
                    type='text'
                    name='title'
                    value={editData.title || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  book.title
                )}
              </td>
              <td>
                {editId === book.id ? (
                  <input
                    type='text'
                    name='author'
                    value={editData.author || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  book.author
                )}
              </td>
              <td>
                {editId === book.id ? (
                  <input
                    type='number'
                    name='no_of_pages'
                    value={editData.no_of_pages || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  book.no_of_pages
                )}
              </td>
              <td>
                {editId === book.id ? (
                  <input
                    type='date'
                    name='published_at'
                    value={editData.published_at || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  book.published_at
                )}
              </td>
              <td className='d-flex justify-content-center align-items-center'>
                {editId === book.id ? (
                  <button type='button' className='btn_Feature p-2' onClick={handleSaveClick}>Save</button>
                ) : (
                  <button type='button' className='btn_Feature p-2' onClick={() => handleEditClick(book)}>Update </button>
                  
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

const UpdateBooks = () => {
  return (
    <div className='CURD_Books container-fluid d-flex flex-column align-items-center justify-content-center'>
      <Update />
    </div>
  );
};

export default UpdateBooks;
