// src/components/CartItem/CartItem.jsx
import React from 'react';
import { useCart } from '../../Context/CartContext';
import './CartItem.css'; 

const CartItem = ({ total, onProcessPayment }) => {
    const { cartItems, removeFromCart } = useCart();


const renderProducts = () => {
    if (!cartItems || cartItems.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    return cartItems.map((item) => (
        <div key={item.id} className="cart-product">
        <img src={item.image} alt={item.name} className="cart-product-image" />
        <div className="cart-product-info">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
        </div>
        </div>
    ));
    };
  
    return (
      <div className="cart-item-container">
        <div className="cart-products-list">
          <h2>Cart</h2>
          {renderProducts()}
        </div>
        <div className="cart-summary">
          <h2>Summary</h2>
          <div className="cart-summary-details">
            <p>Total Items: {cartItems.length}</p>
            <p>Total Price: ${total}</p>
          </div>
          <button onClick={onProcessPayment}>Process Payment</button>
        </div>
      </div>
    );
  };
  

export default CartItem;
