import React from 'react';
import bookRead from '../images/bookRead.jpg'
import bookAdd from '../images/books-add.jpg';
import bookDel from '../images/delete.png';
import bookUpadte from '../images/Update.png';
import { Link } from 'react-router-dom';

const featuresData = [
  {
    id: 1,
    title: 'Add Books',
    text: 'Easily add new books to the collection with detailed information.',
    image: bookAdd,
    links: '/features/add-books'
  },
  {
    id: 2,
    title: 'Read Books',
    text: 'Browse and read your favorite books from the collection.',
    image: bookRead,
    links: '/features/read-books'
  },
  {
    id: 3,
    title: 'Update Books',
    text: 'Update book information and keep your collection up-to-date.',
    image: bookUpadte,
    links: '/features/update-books'
  },
  {
    id: 4,
    title: 'Delete Books',
    text: 'Remove books from your collection that you no longer need.',
    image: bookDel,
    links: '/features/delete-books'
  }
];

const Features = () => {
  return (
    <section id='features'>
      <div className='content_Features container d-flex justify-content-center align-items-center mt-4 mb-4'>
        <div className='row g-4'>
          {featuresData.map(({ id, title, text, image, links }) => (
            <div className='col-md-6 col-lg-3' key={id}>
              <div className='card'>
                <div className='p-3'><img src={image} alt={title} className='card-img-top img-fluid' /></div>
                <div className='card-body'>
                  <h4 className='card-title'>{title}</h4>
                  <p className='card-text'>{text}</p>
                  <button type='button' className='btn_Feature p-2'>
                    <Link to={links} className='text-decoration-none'>Go to {title}</Link>
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
