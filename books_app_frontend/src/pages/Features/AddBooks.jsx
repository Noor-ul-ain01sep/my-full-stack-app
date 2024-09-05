import React from 'react'
import '../../style/style.css' 
import { useState } from 'react'
import { useEffect } from 'react'
 
const Add=()=>{

  const [book,setbook]=useState({
    title: '',
    author: '',
    no_of_pages: '',
    published_at: '',
  })

  const handleInput = (e) => {
    const { name, value } = e.target;
    setbook({ ...book, [name]: value });
  };
  
  
  useEffect(() => {
      fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8081/books');
      if (!response.ok) throw new Error('Network Problem');
      //const data = await response.json();
      // setbook(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  
  const addBooks=async()=>{
  try{
      const response=await fetch('http://localhost:8081/books',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })
      if(!response.ok) throw new Error('Network Problem')
        alert('Book added successfully');
        fetchTasks()
        setbook({title:'',author:'',no_of_pages:'',published_at:''})
  }
  catch(error)
  {
    console.error('Error adding Books', error);
    alert('Failed to add the book');
  }
  }

  return (
    <div className='add container'>
      <h1 className='Books_title text-uppercase text-center display-3 fw-bold mb-4' >Add Books</h1>
      <form action=" ">

      <div className="mb-3 mt-3">
        <label htmlFor="title" className="form-label">Enter the Title For a Book</label>
        <input type="text" name="title" id="title" onChange={handleInput} className="form-control" value={book.title}  />
      </div>

      <div className="mb-3">
        <label htmlFor="author"  className="form-label" >Enter the Name of Author For a Book</label>
        <input type="text" name="author" id="author" onChange={handleInput} className="form-control" value={book.author}/>
      </div>

        <div className="mb-3">
        <label htmlFor="no_of_pages"  className="form-label" >Enter the Number of Pages For a Book</label>
        <input type="number" name="no_of_pages" id="no_of_pages" onChange={handleInput} className="form-control" value={book.no_of_pages} />
        </div>

        <div className="mb-3">
        <label htmlFor="published_at"  className="form-label" >Enter Published Date For a Book</label>
        <input type="date" name="published_at" id="published_at" onChange={handleInput} className="form-control" value={book.published_at} />
        </div>

        <button type="button" className="btn_Feature p-3" onClick={addBooks} >Add Book</button>
      </form>
    </div>
   
  )
}

const AddBooks = () => {
  return (
    <div className='CURD_Books container-fluid d-flex flex-column align-items-center justify-content-center'>
      <Add/>
    </div>
  )
}

export default AddBooks