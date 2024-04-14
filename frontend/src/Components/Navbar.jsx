import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
        <div className='d-flex justify-content-around vw-100 p-3 bg-primary'>
            <h2 className='text-white text-decoration-none fs-2'>Saurabh_Ganguly</h2>
            <Link to="/" className='text-white text-decoration-none fs-2'>Home Page</Link>
        </div>
    </div>
  )
}
