// src/components/AdminUpdateClothingForm/AdminUpdateClothingForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUpdateClothingForm.css';

const AdminUpdateClothingForm = ({ onUpdateClothing }) => {
    const [productId, setProductId] = useState('');
    const [updatedProduct, setUpdatedProduct] = useState(null);
    const [productIds, setProductIds] = useState([]);

    useEffect(() => {
        const fetchProductIds = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8001/api/v1/products');
                setProductIds(response.data.map((product) => product.id));
            } catch (error) {
                console.error('Error fetching product IDs:', error);
            }
        };

        fetchProductIds();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8001/api/v1/products/${productId}`);
                setUpdatedProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleProductChange = (e) => {
        setProductId(e.target.value);
    };

    const handleUpdateClothing = async () => {
        try {
            await axios.put(`http://127.0.0.1:8001/api/v1/products/${productId}`, updatedProduct);
            onUpdateClothing(updatedProduct);
        } catch (error) {
            console.error('Error updating clothing:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    return (
        <div className="admin-update-clothing-form">
            <h2>Update Clothing</h2>
            <div>
                <label>Select Product ID:</label>
                <select value={productId} onChange={handleProductChange}>
                    <option value="">Select a Product ID</option>
                    {productIds.map((id) => (
                        <option key={id} value={id}>
                            {id}
                        </option>
                    ))}
                </select>
            </div>
            {productId && (
                <>
                    {updatedProduct ? (
                        <>
                            <label>
                                <img className='admin-update-clothing-form-image' src={updatedProduct.image} alt={updatedProduct.name} />
                                Name:
                                <input disabled type="text" name="name" value={updatedProduct.name} onChange={handleChange} />
                            </label>
                            <label>
                                Brand:
                                <input disabled type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
                            </label>
                            <label>
                                Description:
                                <textarea disabled name="description" value={updatedProduct.description} onChange={handleChange} />
                            </label>
                            <label>
                                Price:
                                <input type="number" name="price" value={updatedProduct.price} onChange={handleChange} />
                            </label>
                            <label>
                                Category:
                                <input disabled type="text" name="category" value={updatedProduct.category} onChange={handleChange} />
                            </label>
                            <label>
                                Color:
                                <input disabled type="text" name="color" value={updatedProduct.color} onChange={handleChange} />
                            </label>
                            <label>
                                Size:
                                <input disabled type="text" name="size" value={updatedProduct.size} onChange={handleChange} />
                            </label>
                            <label>
                                Quantity:
                                <input type="number" name="quantity" value={updatedProduct.quantity} onChange={handleChange} />
                            </label>
                            <label>
                                Image URL:
                                <input type="text" disabled name="image" value={updatedProduct.image} onChange={handleChange} />
                            </label>
                            <div className="button-group">
                                <button onClick={handleUpdateClothing}>Update Clothing</button>
                            </div>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminUpdateClothingForm;
