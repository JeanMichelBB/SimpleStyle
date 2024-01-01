// src/pages/AdminPage/AdminPage.js
import React from 'react';
import AdminAddClothingForm from '../../components/AdminAddClothingForm/AdminAddClothingForm';
import AdminUpdateClothingForm from '../../components/AdminUpdateClothingForm/AdminUpdateClothingForm';
import './AdminPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const AdminPage = () => {
  const handleAddClothing = (newClothing) => {
    console.log('Adding new clothing:', newClothing);
  };
  const handleUpdateClothing = (updatedClothing) => {
    console.log('Updating clothing:', updatedClothing);
  }

  return (
    <div>
      <Header />
      <h1>Admin Page</h1>
      <AdminAddClothingForm onAddClothing={handleAddClothing} />
      <AdminUpdateClothingForm onUpdateClothing={handleUpdateClothing} />
      <Footer />
    </div>
  );
};

export default AdminPage;
