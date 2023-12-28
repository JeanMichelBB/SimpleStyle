// src/components/AdminAddClothingForm/AdminAddClothingForm.js
import React, { useState } from 'react';
import axios from 'axios'; 

const AdminAddClothingForm = ({ onAddClothing }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleAddClothing = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/add_clothing', {
        name,
        description,
        price: parseFloat(price),
      });

      onAddClothing(response.data); // You may update the state or perform other actions
      // Reset the form after submission
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error adding clothing:', error);
    }
  };

  return (
    <div>
      <h2>Add Clothing</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <button onClick={handleAddClothing}>Add Clothing</button>
    </div>
  );
};

export default AdminAddClothingForm;