import React, { useState } from 'react';
import axios from 'axios'; 
import './AdminAddClothingForm.css'; 

const AdminAddClothingForm = ({ onAddClothing }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');

  const handleAddClothing = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8001/api/v1/products', {
        id,
        name,
        brand,
        description,
        price: parseFloat(price),
        category,
        color,
        size,
        quantity: parseInt(quantity, 10),
        image,
      });

      onAddClothing(response.data); 
      
      setId('');
      setName('');
      setBrand('');
      setDescription('');
      setPrice('');
      setCategory('');
      setColor('');
      setSize('');
      setQuantity('');
      setImage('');
    } catch (error) {
      console.error('Error adding clothing:', error);
    }
  };

  return (
    <div className="admin-add-clothing-form">
      <h2>Add Clothing</h2>
      <label>
        ID:
        <input disabled type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </label>
      <label>
        Name:
        <input disabled type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Brand:
        <input disabled type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea disabled value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Price:
        <input disabled type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <label>
        Category:
        <input disabled type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <label>
        Color:
        <input disabled type="text" value={color} onChange={(e) => setColor(e.target.value)} />
      </label>
      <label>
        Size:
        <input disabled type="text" value={size} onChange={(e) => setSize(e.target.value)} />
      </label>
      <label>
        Quantity:
        <input disabled type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </label>
      <label>
        Image URL:
        <input disabled type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </label>
      <div className="button-group">
        <button disabled onClick={handleAddClothing}>Add Clothing</button>
      </div>
    </div>
  );
};

export default AdminAddClothingForm;
