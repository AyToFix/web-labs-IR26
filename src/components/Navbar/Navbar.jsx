import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => (
  <nav className="navbar">
    <img class="printer-logo" src="/printer.jpg" alt="Printer Logo" />
    <ul className="navbar-list">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/catalog">Catalog</Link></li>
      <li><a href="#cart">Cart</a></li>
    </ul>
  </nav>
);
