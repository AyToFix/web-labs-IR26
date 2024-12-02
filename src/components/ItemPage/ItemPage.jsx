import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DataContext from '../Common/DataContext';
import './ItemPage.css';

export const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { printers } = useContext(DataContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = printers.find(product => product.id === parseInt(id));
    setProduct(foundProduct);
  }, [id, printers]);

  if (!product) {
    return <h2>Item not found</h2>;
  }

  const handleQuantityChange = (e) => {
    const value = Math.max(0, e.target.value === '' ? 0 : parseInt(e.target.value));
    setQuantity(value);
  };

  return (
    <div className="item-page">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p className="details">{product.size} / {product.type}</p>
      <p>Price: {product.price}</p>
      <div className="quantity-field">
        <label>
          Quantity:ㅤ  
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
          Guarantee:ㅤ 
          <select>
            <option value="12 months">12 months</option>
            <option value="24 months">24 months</option>
          </select>
        </label>
      </div>
      <button onClick={() => navigate(-1)}>Go back</button>
      <button>Add to cart</button>
    </div>
  );
};
