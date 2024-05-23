import React, { useState, useEffect } from 'react';
import './AccountDetails.css';
import { faker } from '@faker-js/faker';

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
  const [clickedField, setClickedField] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('user_id');

    fetch(`http://127.0.0.1:8001/api/v1/users/${userId}`, {
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

  const generateFakeData = () => {
    return {
      hashed_password: faker.internet.password(),
      name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
    };
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    const userDataWithId = { ...userData, userId: localStorage.getItem('user_id') };
  
    fetch(`http://127.0.0.1:8001/api/v1/users/${userDataWithId.userId}`, {
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

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleFieldClick = (field) => {
    setClickedField(field);
    setUserData(generateFakeData());
  };

  return (
    <div className="account-details-container">
      <div className="personal-info-box">
        <h2>Personal Information</h2>
        <div className="info-item">
          <label>Name:</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            readOnly={!editMode}
            onClick={() => handleFieldClick('name')}
            disabled={clickedField === 'name'}
          />
        </div>
        <div className="info-item">
          <label>Last Name:</label>
          <input
            type="text"
            value={userData.last_name}
            onChange={(e) => handleInputChange('last_name', e.target.value)}
            readOnly={!editMode}
            onClick={() => handleFieldClick('last_name')}
            disabled={clickedField === 'last_name'}
          />
        </div>
        <div className="info-item">
          <label>Address:</label>
          <input
            type="text"
            value={userData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            readOnly={!editMode}
            onClick={() => handleFieldClick('address')}
            disabled={clickedField === 'address'}
          />
        </div>
        <div className="info-item">
          <label>Phone:</label>
          <input
            type="text"
            value={userData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            readOnly={!editMode}
            onClick={() => handleFieldClick('phone')}
            disabled={clickedField === 'phone'}
          />
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
