import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { ProductTiles } from './components/ProductTiles/ProductTiles';
import { Footer } from './components/Footer/Footer';
import { Catalog } from './components/Catalog/Catalog';
import { ItemPage } from './components/ItemPage/ItemPage';
import { CartPage } from './components/CartPage/CartPage';
import { DataProvider } from './components/Common/DataContext';
import { Provider } from 'react-redux';
import store from './store';

import './components/Header/Header.css';
import './components/Hero/Hero.css';
import './components/Navbar/Navbar.css';
import './components/ProductTiles/ProductTile.css';
import './components/Footer/Footer.css';

export function App() {
  return (
    <Provider store={store}>
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
              <Route path="/cart-page" element={<CartPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </Provider>
  );
}
