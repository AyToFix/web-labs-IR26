import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { ProductTiles } from './components/ProductTiles/ProductTiles';
import { Footer } from './components/Footer/Footer';
import { Catalog } from './components/Catalog/Catalog';
import { ItemPage } from './components/ItemPage/ItemPage';
import { DataProvider } from './components/Common/DataContext';

import './components/Header/Header.css';
import './components/Hero/Hero.css';
import './components/Navbar/Navbar.css';
import './components/ProductTiles/ProductTile.css';
import './components/Footer/Footer.css';

export function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Navbar />
          <Routes>
            <Route path="/" element={<>
                <Hero />
                <ProductTiles />
              </>} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/item/:id" element={<ItemPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}
