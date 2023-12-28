// src/pages/AdminPage/AdminPage.js
import React from 'react';
import AdminAddClothingForm from '../../components/AdminAddClothingForm/AdminAddClothingForm';
import './AdminPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const AdminPage = () => {
  const handleAddClothing = (newClothing) => {
    // Implement logic to send the new clothing data to your backend
    console.log('Adding new clothing:', newClothing);
    // You may use fetch or another method to send the data to your backend API
  };

  return (
    <div>
      <Header />
      <h1>Admin Page</h1>
      <AdminAddClothingForm onAddClothing={handleAddClothing} />
      <Footer />
    </div>
  );
};

export default AdminPage;
