import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductDetails.css';


const ProductDetails = () => {
  const location = useLocation();
  const passedProduct = location.state && location.state.product;

  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  if (!passedProduct) {
    return <p>Loading...</p>;
  }

  const handleAddToCart = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/cart/${localStorage.getItem('user_id')}?product_id=${passedProduct.id}&quantity=${quantity}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
  
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Selected quantity exceeds available quantity');
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
  
      const data = await response.json();
      console.log('Product added to cart successfully:', data);
  
      window.location.reload();
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
      if (error instanceof TypeError) {
        console.error('Network error. Please try again.');
      } else {
        console.error('Error adding product to cart. Please check the console for details.');
      }
    }
  };
  

  return (
    <div className="product-details-container">
      <div className="product-details-image">
        <img src={passedProduct.image} alt={passedProduct.name} />
      </div>
      <div className="product-details-info">
        <h2>{passedProduct.name}</h2>
        <p>Price: ${passedProduct.price}</p>
        <p>{passedProduct.description}</p>
        <p>Category: {passedProduct.category}</p>

        <p>Brand: {passedProduct.brand}</p>
        <p>Color: {passedProduct.color}</p>
        <p>Size: {passedProduct.size}</p>
      
        <p>Available Stock: {passedProduct.quantity}</p>


        <div className="quantity-input">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            min={1}
            max={passedProduct.quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          />
        </div>

        {error ? (
          <p className="error-message">{error}</p>
        ) : passedProduct.cart === "" ? (
          <p className="error-message">Cart is empty.</p>
        ) : null}

        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductDetails;
