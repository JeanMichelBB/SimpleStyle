import React, { useState, useEffect } from 'react';
import './OrdersDetails.css';
import OrderModel from '../../Models/OrderModel';

const OrdersDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');

    fetch(`http://127.0.0.1:8001/api/v1/orders/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((orderData) => {
        const order = new OrderModel();
        order.orderId = orderData.order_id;
        order.userId = orderData.user_id;
        order.total = orderData.total;
        order.status = orderData.status;
        order.products = orderData.products;

        setOrderDetails(order);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteOrder = () => {
    const userId = localStorage.getItem('user_id');

    fetch(`http://127.0.0.1:8001/api/v1/orders/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log('Order deleted successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="orders-details-container">
      {orderDetails ? (
        <div>
          <h2>Order Details</h2>
          <p>Total: ${orderDetails.total.toFixed(2)}</p>
          <p>Status: {orderDetails.status}</p>
          <h3>Products:</h3>
          <ul>
            {orderDetails.products.map((product) => (
              <li key={product.productId}>
                Product ID: {product.productId}, Quantity: {product.quantity}
              </li>
            ))}
          </ul>
          <button onClick={handleDeleteOrder}>Cancel Order</button>
        </div>
      ) : (
        <h2>no order details</h2>
      )}
    </div>
  );
};

export default OrdersDetails;
