import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Catalog.css';
import { SelectFilter } from '../Select/Select';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const Catalog = () => {
  const [printers, setPrinters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    size: '',
    color: '',
    type: ''
  });

  const fetchPrinters = useCallback(async () => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`${BASE_URL}/printers?${params}`);
      setPrinters(response.data);
    } catch (error) {
      console.error('Error fetching printers:', error);
    }
  }, [filters]);

  useEffect(() => {
    fetchPrinters();
  }, [fetchPrinters]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredItems = printers.filter(item =>
    item.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) &&
    (filters.size ? item.size === filters.size : true) &&
    (filters.color ? item.color === filters.color : true) &&
    (filters.type ? item.type === filters.type : true)
  );

  const sizeOptions = [
    { value: '', label: 'All' },
    { value: 'Large', label: 'Large' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Small', label: 'Small' }
  ];

  const colorOptions = [
    { value: '', label: 'All' },
    { value: 'White', label: 'White' },
    { value: 'Black', label: 'Black' }
  ];

  const typeOptions = [
    { value: '', label: 'All' },
    { value: 'Laser', label: 'Laser' },
    { value: 'Inkjet', label: 'Inkjet' }
  ];

  return (
    <section className="catalog">
      <h2>Catalog</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="filters">
        <SelectFilter
          label="Size"
          name="size"
          options={sizeOptions}
          value={filters.size}
          onChange={handleFilterChange}
        />
        <SelectFilter
          label="Color"
          name="color"
          options={colorOptions}
          value={filters.color}
          onChange={handleFilterChange}
        />
        <SelectFilter
          label="Type"
          name="type"
          options={typeOptions}
          value={filters.type}
          onChange={handleFilterChange}
        />
      </div>
      <ul>
        {filteredItems.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <Link to={`/item/${product.id}`}>
              <button>View more</button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
