import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../actions';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

export const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (id, guarantee) => {
    dispatch(removeFromCart({ id, guarantee }));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleBackToItems = () => {
    navigate(-1);
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={`${item.id}-${item.guarantee}`}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div>
                <p>{item.name}</p>
                <p>Quantity: {item.quantity} шт.</p>
                <p>Price: ${item.price}</p>
                <p>Сума: ${item.price * item.quantity}</p>
                <p>Guarantee: {item.guarantee}</p>
                <button onClick={() => handleRemoveFromCart(item.id, item.guarantee)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="p">Ваша корзина порожня (купи шось)</p>
      )}
      {cart.length > 0 && <h2>Загальна сума: ${calculateTotalPrice()}</h2>}
      <button onClick={handleBackToItems}>Back to Items</button>
    </div>
  );
};
