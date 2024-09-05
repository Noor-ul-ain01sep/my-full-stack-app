import React from 'react'
import { Link } from 'react-router-dom';
import '../style/style.css';


const Header = () => {
  return (
    <div>
        <nav className='navbar navbar-expand-lg'>
        <div className='container-fluid' >
        
            <Link to='/' className='navbar-brand p-2 fw-bold' >Books <span>Shelf</span></Link>
        

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
         </button>

         <div className='collapse navbar-collapse' id='navbar'>
            <ul className='navbar-nav ms-auto p-2  '>
                <li className='nav-item '><Link to="/" className="nav-link">Home</Link></li>
          
            </ul>
         </div>

        </div>
        </nav>
    </div>
  )
}

export default Header