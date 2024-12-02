import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DataContext from '../Common/DataContext';
import { addToCart } from '../../actions';
import './ItemPage.css';

const parsePrice = (price) => {
  return parseFloat(price.replace('$', ''));
};

export const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { printers } = useContext(DataContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [guarantee, setGuarantee] = useState('12 months');
  const dispatch = useDispatch();

  useEffect(() => {
    const foundProduct = printers.find((product) => product.id === parseInt(id));
    setProduct(foundProduct);
  }, [id, printers]);

  const handleQuantityChange = (e) => {
    const value = Math.max(0, e.target.value === '' ? 0 : parseInt(e.target.value));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (product) {
      const garantPrice = guarantee === '24 months' ? parsePrice(product.price) + 25 : parsePrice(product.price);

      const productToCart = {
        ...product,
        price: garantPrice,
        quantity, 
        guarantee,
      };
      dispatch(addToCart(productToCart));
      navigate('/cart-page');
    }
  };

  if (!product) {
    return <h2>Item not found</h2>;
  }

  return (
    <div className="item-page">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p className="details">{product.size} / {product.type}</p>
      <p>Price: {product.price}</p>
      <div className="quantity-field">
        <label>
          Quantity:  
          <input 
            type="number" 
            value={quantity} 
            onChange={handleQuantityChange} 
            min="0"
          />
        </label>
      </div>
      <div className="selectable-field">
        <label>
          Guarantee:  
          <select value={guarantee} onChange={(e) => setGuarantee(e.target.value)}>
            <option value="12 months">12 months</option>
            <option value="24 months">24 months</option>
          </select>
        </label>
      </div>
      <button onClick={() => navigate(-1)}>Go back</button>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};
