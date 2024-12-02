import React from 'react';
import './Select.css';

export const SelectFilter = ({ label, name, value, options, onChange }) => (
  <label>
    {label}
    <select name={name} value={value} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);
