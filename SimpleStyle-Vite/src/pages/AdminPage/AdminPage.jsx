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
      <p>
        creating a new clothing item got disabled because faker.js do not have specific data needed for the new item
      </p>
      <p> 
        updating a clothing item got disabled. only price and quantity can be updated
      </p>
      <div className="admin-forms-container">
        <AdminAddClothingForm onAddClothing={handleAddClothing} />
        <AdminUpdateClothingForm onUpdateClothing={handleUpdateClothing} />
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
