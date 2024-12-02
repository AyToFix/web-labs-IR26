import React, { useEffect } from 'react';
import axios from 'axios';
import './Header.css';

const BASE_URL = 'http://localhost:5000/api';

export const Header = () => {
  useEffect(() => {
    axios.get(`${BASE_URL}/header`)
      .then(response => {
        console.log('Header loaded', response.data);
      })
      .catch(error => {
        console.error('Error loading header', error);
      });
  }, []);

  return (
    <header>
      <h1>Printer Shop</h1>
    </header>
  );
};
