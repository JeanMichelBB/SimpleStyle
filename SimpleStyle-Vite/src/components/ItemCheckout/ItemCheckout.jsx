import React, { useState, useEffect } from 'react';
import './ItemCheckout.css';
import OrderModel from '../../Models/OrderModel';

const ItemCheckout = () => {
  const userId = localStorage.getItem('user_id');
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null); 
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    tax: 0,
    shipping: 5.00, 
    total: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8001/api/v1/users/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const userData = await response.json();
        setUser(userData); 

        const productInfoPromises = userData.cart.map(async (item) => {
          const productResponse = await fetch(`http://127.0.0.1:8001/api/v1/products/${item.product_id}`);
          const productData = await productResponse.json();
          return { productId: item.product_id, ...productData, quantity: item.quantity };
        });
    
        const productInfoList = await Promise.all(productInfoPromises);
    
        const cartItemsWithInfo = productInfoList.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          size: item.size,
          quantity: item.quantity,
          price: item.price, 
        }));
    
        setCartItems(cartItemsWithInfo);
    
        const subtotal = cartItemsWithInfo.reduce((total, item) => total + item.price * item.quantity, 0);
        const tax = 0.1 * subtotal; 
        const shipping = parseFloat(orderSummary.shipping); 
        const total = subtotal + tax + shipping;
    
        setOrderSummary({
          subtotal: subtotal.toFixed(2),
          tax: tax.toFixed(2),
          shipping: shipping.toFixed(2),
          total: total.toFixed(2),
        });
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [userId, orderSummary.shipping]);

  const handleConfirmOrder = async () => {
    try {
      const orderData = new OrderModel();
      orderData.userId = userId;
      orderData.products = cartItems.map(item => ({ productId: item.productId, quantity: item.quantity }));
      orderData.total = orderSummary.total;
      orderData.status = 'pending';
  
      const response = await fetch(`http://127.0.0.1:8001/api/v1/orders/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
  
      const clearCartResponse = await fetch(`http://127.0.0.1:8001/api/v1/cart/${userId}/clear`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
  
      if (!clearCartResponse.ok) {
        throw new Error(`HTTP error! Status: ${clearCartResponse.status}`);
      }
  
      alert('Order confirmed successfully!');
      window.location.href = '/';
  
    } catch (error) {
      console.error('Error confirming order:', error.message);
    }
  };
  
  return (
    <div className="order-component-container">
      <div className="order-item-list">
        <h2>Order Items</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.productId}>
              <img src={item.image} alt={item.name} />
              <p>Name: {item.name}</p>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="summary-item">
          <p>Subtotal</p>
          <p>${orderSummary.subtotal}</p>
        </div>
        <div className="summary-item">
          <p>Tax</p>
          <p>${orderSummary.tax}</p>
        </div>
        <div className="summary-item">
          <p>Shipping</p>
          <p>${orderSummary.shipping}</p>
        </div>
        <div className="summary-item">
          <p>Total</p>
          <p>${orderSummary.total}</p>
        </div>
        <button onClick={handleConfirmOrder}>Confirm Order</button>
      </div>
    </div>
  );
};

export default ItemCheckout;
