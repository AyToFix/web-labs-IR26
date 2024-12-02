import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Navbar.css';

const BASE_URL = 'http://localhost:5000/api';

export const Navbar = () => {
  useEffect(() => {
    axios.get(`${BASE_URL}/navbar`)
      .then(response => {
        console.log('Navbar loaded', response.data);
      })
      .catch(error => {
        console.error('Error loading navbar', error);
      });
  }, []);

  return (
    <nav className="navbar">
      <img className="printer-logo" src="/printer.jpg" alt="Printer Logo" />
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/catalog">Catalog</Link></li>
        <li><a href="#cart">Cart</a></li>
      </ul>
    </nav>
  );
};
