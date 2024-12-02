import React, { useEffect } from 'react';
import axios from 'axios';
import './Footer.css';

const BASE_URL = 'http://localhost:5000/api';

export const Footer = () => {
  useEffect(() => {
    axios.get(`${BASE_URL}/footer`)
      .then(response => {
        console.log('Footer loaded', response);
      })
      .catch(error => {
        console.error('Error loading footer', error);
      });
  }, []);

  return (
    <footer>
      <p>2024 Printer Shop © All rights reserved</p>
      <div className="social-icons">
        <a href="#facebook">Facebook</a>
        <a href="#twitter">Twitter</a>
        <a href="#instagram">Instagram</a>
      </div>
    </footer>
  );
};
