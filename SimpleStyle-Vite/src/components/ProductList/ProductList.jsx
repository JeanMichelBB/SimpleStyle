import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory
import './ProductList.css';
import '../../App.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle the redirect
  const redirectToProduct = (productId) => {
    history.push(`/products/${productId}`);
  };

  return (
    <div className="clothing-grid">
      {products.map((product) => (
        <div
          key={product.id}
          className="clothing-item"
          onClick={() => redirectToProduct(product.id)} 
        >
          <img src={product.image} alt={product.name} className="clothing-image" />
          <div className="clothing-info">
            <h3 className="clothing-name">{product.name}</h3>
            <p className="clothing-price">${product.price}</p>
            <p className="clothing-size">Size: {product.size}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
