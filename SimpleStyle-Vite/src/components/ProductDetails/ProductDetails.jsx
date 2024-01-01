// src/components/ProductDetails/ProductDetails.jsx
// src/components/ProductDetails/ProductDetails.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import './ProductDetails.css'; 

const ProductDetails = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  
  const passedProduct = location.state && location.state.product;

  if (!passedProduct) {
    return <p>Loading...</p>;
  }

  const handleAddToCart = () => {
    addToCart(passedProduct);
  };

  return (
    <div className="product-details-container">
      <div className="product-details-image">
        <img src={passedProduct.image} alt={passedProduct.name} />
      </div>
      <div className="product-details-info">
        <h2>{passedProduct.name}</h2>
        <p>Brand: {passedProduct.brand}</p>
        <p>Description: {passedProduct.description}</p>
        <p>Price: ${passedProduct.price}</p>
        <p>Category: {passedProduct.category}</p>
        <p>Color: {passedProduct.color}</p>
        <p>Size: {passedProduct.size || 'Not specified'}</p>

      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add to Cart
      </button>      
      </div>
    </div>
  );
};

export default ProductDetails;
