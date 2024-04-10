import React, { useEffect, useState } from 'react';
import './CartItem.css';

const CartItem = () => {
  const [userCart, setUserCart] = useState([]);
  const [productInfo, setProductInfo] = useState({});
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

       const productInfoPromises = userData.cart.map(async (item) => {
          const productResponse = await fetch(`http://127.0.0.1:8000/api/v1/products/${item.product_id}`);
          const productData = await productResponse.json();
          return { productId: item.product_id, ...productData };
        }); 

        const productInfoList = await Promise.all(productInfoPromises);

        const productInfoMap = {};
        productInfoList.forEach((product) => {
          productInfoMap[product.productId] = product;
        });
        setProductInfo(productInfoMap);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleQuantityChange = (productId, newQuantity) => {
    setUpdatedQuantity({ ...updatedQuantity, [productId]: newQuantity });
  };

  const handleChangeQuantity = async (productId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/cart/change_quantity/${userId}?product_id=${productId}&new_quantity=${updatedQuantity[productId] || 0}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedCart = userCart.map(item =>
        item.product_id === productId ? { ...item, quantity: updatedQuantity[productId] } : item
      );
      setUserCart(updatedCart);
      setUpdatedQuantity({});
      window.location.reload();
    } catch (error) {
      console.error('Error changing quantity:', error.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/cart/${userId}/remove?product_id=${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedCart = userCart.filter(item => item.product_id !== productId);
      setUserCart(updatedCart);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product from cart:', error.message);
    }
  };

  if (userCart.length === 0 || (Array.isArray(userCart[0]) && userCart[0][0] === '')) {
    return (
      <div className="cart-item-container">
        <h2>Cart is Empty</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Cart Items</h2>
    <div className="cart-item-container">
      <ul>
        {userCart.map((item, index) => (
          <li className='item' key={index}>

            <div>
              <img src={productInfo[item.product_id]?.image} alt={productInfo[item.product_id]?.name} />
            </div>
            <div>
              <p>{productInfo[item.product_id]?.name}</p>
            </div>
            <div className="quantity-section">
              <p>
                Quantity:{' '}
                <input
                  type="number"
                  value={updatedQuantity[item.product_id] || item.quantity}
                  onChange={(e) => handleQuantityChange(item.product_id, e.target.value)}
                />
              </p>
            </div>
            <button onClick={() => handleChangeQuantity(item.product_id)}>Change Quantity</button>
            <button onClick={() => handleDeleteProduct(item.product_id)}>Remove Item</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
  
  
};

export default CartItem;
