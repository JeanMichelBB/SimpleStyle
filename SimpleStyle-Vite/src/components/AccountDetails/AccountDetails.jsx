// src/components/AccountDetails.jsx
import React, { useState, useEffect } from 'react';
import './AccountDetails.css';

const AccountDetails = () => {
  const [userData, setUserData] = useState({
    email: '',
    hashed_password: '',
    name: '',
    last_name: '',
    address: '',
    phone: '',
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');

    fetch(`http://127.0.0.1:8000/api/v1/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data); 
      })
      .catch((error) => {
        console.error('Error fetching user information:', error.message);
      });
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    const userDataWithId = { ...userData, userId: localStorage.getItem('user_id') };
  
    fetch(`http://127.0.0.1:8000/api/v1/users/${userDataWithId.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(userDataWithId),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('User information updated successfully:', data);
      })
      .catch((error) => {
        console.error('Error updating user information:', error.message);
        if (error instanceof TypeError) {
          console.error('Network error. Please try again.');
        } else {
          console.error('Error updating user information. Please check the console for details.');
        }
      })
      .finally(() => {
        setEditMode(false);
      });
  };
  

  return (
    <div className="account-details-container">
      <div className="personal-info-box">
        <h2>Personal Information</h2>
        <div className="info-item">
          <label>Email:</label>
          <span>{userData.email}</span>
        </div>
        <div className="info-item">
          <label>Name:</label>
          {editMode ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
          ) : (
            <span>{userData.name}</span>
          )}
        </div>
        <div className="info-item">
          <label>Last Name:</label>
          {editMode ? (
            <input
              type="text"
              value={userData.last_name}
              onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
            />
          ) : (
            <span>{userData.last_name}</span>
          )}
        </div>
        <div className="info-item">
          <label>Address:</label>
          {editMode ? (
            <input
              type="text"
              value={userData.address}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
            />
          ) : (
            <span>{userData.address}</span>
          )}
        </div>
        <div className="info-item">
          <label>Phone:</label>
          {editMode ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            />
          ) : (
            <span>{userData.phone}</span>
          )}
        </div>
        {editMode ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
