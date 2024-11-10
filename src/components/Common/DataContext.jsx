import React, { createContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [printers, setPrinters] = useState([
    { id: 1, name: 'HP LaserJet M141cw', description: 'Better version of M111cw, new features.', price: '$415', image: '/print.png', size: 'Large', color: 'White', type: 'Laser' },
    { id: 2, name: 'HP LaserJet M111cw', description: 'Good choice for average user', price: '$500', image: '/print2.png', size: 'Medium', color: 'White', type: 'Laser' },
    { id: 3, name: 'HP InkJet M110w', description: 'Best value for home and office use.', price: '$400', image: '/print3.png', size: 'Small', color: 'Black', type: 'Inkjet' },
  ]);

  return (
    <DataContext.Provider value={{ printers, setPrinters }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;