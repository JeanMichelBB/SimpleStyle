// src/components/CartSummary/CartSummary.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './CartSummary.css';

const CartSummary = () => {
  const [userCart, setUserCart] = useState([]);
  const [productPrices, setProductPrices] = useState({});
  const [updatedQuantity, setUpdatedQuantity] = useState({});
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        setUserCart(userData.cart || []);

        const pricesPromises = userData.cart.map(async (item) => {
          const productResponse = await fetch(`http://127.0.0.1:8000/api/v1/products/${item.product_id}`);
          const productData = await productResponse.json();
          return { productId: item.product_id, price: productData.price || 0 };
        });

        const prices = await Promise.all(pricesPromises);

        const productPricesMap = {};
        prices.forEach((product) => {
          productPricesMap[product.productId] = product.price;
        });
        setProductPrices(productPricesMap);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleQuantityChange = (productId, newQuantity) => {
    setUpdatedQuantity({ ...updatedQuantity, [productId]: newQuantity });
  };


  const totalPrice = userCart.reduce((total, item) => {
    const productPrice = productPrices[item.product_id] || 0;
    return total + productPrice * item.quantity;
  }, 0);

  const tax = 0.1 * totalPrice; 
  const shipping = 5.00; 

  return (
    <div className="cart-summary-container">
      <div>
      <h2>Cart Summary</h2>
        <div className="cart-summary-item">
          <p>Subtotal</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <div className="cart-summary-item">
          <p>Tax</p>
          <p>${tax.toFixed(2)}</p>
        </div>
        <div className="cart-summary-item">
          <p>Shipping</p>
          <p>${shipping.toFixed(2)}</p>
        </div>
        <div className="cart-summary-item">
          <p>Total</p>
          <p>${(totalPrice + tax + shipping).toFixed(2)}</p>
        </div>
        <Link to="/checkout" className="checkout-button">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
