import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JS + Popper.js

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import AddBooks from './pages/Features/AddBooks';
import ReadBooks from './pages/Features/ReadBooks';
import UpdateBooks from './pages/Features/UpdateBooks';
import Delbooks from './pages/Features/Delbooks';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

 <BrowserRouter>
 <Header/>
 <Routes>
  <Route index element={<Home />} />
  <Route path='/features' element={<Features/>}/>
  <Route path='/features/add-Books' element={<AddBooks/>} />
  <Route path='/features/read-books' element={<ReadBooks/>} />
  <Route path='/features/update-books' element={<UpdateBooks/>} />
  <Route path='/features/delete-books' element={<Delbooks/>} />

 </Routes>
 <Footer/>
 </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
