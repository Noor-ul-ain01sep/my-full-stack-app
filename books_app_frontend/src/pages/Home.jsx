import React from 'react';
import bookImage from '../images/Books.png'; 
import '../style/style.css'
import Features from './Features';

const Home = () => {
  return (
    <div>
      <div className='content_Home container-fluid d-flex flex-column justify-content-center align-items-center'>
      <h1 className='home_title display-3 fw-bold text-center'>Dive Into a World of Stories and Adventure!</h1>
        <img src={bookImage} alt='Books' className='content-image  img-fluid' />
        <button className='btn_Feature p-3'><a className='text-decoration-none' href="#features"> Explore Features</a></button>
      </div>
      <Features/>
    </div>
  );
}

export default Home;
