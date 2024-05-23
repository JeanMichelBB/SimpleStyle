import React, { useState } from 'react';
import './AuthDetails.css';
import UserModel from '../../Models/UserModel';

function AuthDetails() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [emailSuccess, setEmailSuccess] = useState(null);

  const passwordUserData = new UserModel();
  passwordUserData.hashed_password = currentPassword;
  passwordUserData.new_password = newPassword;

  const emailUserData = new UserModel();
  emailUserData.hashed_password = currentPassword;
  emailUserData.new_email = newEmail;

  const handleChangePassword = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8001/api/auth/users/me/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(passwordUserData),
      });

      if (response.ok) {
        setPasswordSuccess('Password updated successfully');
        setPasswordError(null);
        setCurrentPassword('');
        setNewPassword('');
      } else {
        const errorData = await response.json();
        setPasswordError(`Error: ${errorData.detail}`);
        setPasswordSuccess(null);
        console.error('Error changing password:', errorData);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError('An error occurred while changing the password');
      setPasswordSuccess(null);
    }
  };

  const handleChangeEmail = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8001/api/auth/users/me/email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(emailUserData),
      });

      if (response.ok) {
        setEmailSuccess('Email updated successfully');
        setEmailError(null);
        setCurrentPassword('');
        setNewPassword('');
        setNewEmail('');
      } else {
        const errorData = await response.json();
        setEmailError(`Error: ${errorData.detail}`);
        setEmailSuccess(null);
        console.error('Error changing email:', errorData);
      }
    } catch (error) {
      console.error('Error changing email:', error);
      setEmailError('An error occurred while changing the email');
      setEmailSuccess(null);
    }
  };

  return (
    <div className="change-password-container">
      <div>
        <h2>Change Password</h2>
        {passwordError && <div className="error-message">{passwordError}</div>}
        {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          disabled
        />
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled
        />
        <button disabled onClick={handleChangePassword}>Change Password</button>
      </div>

      <div>
        <h2>Change Email</h2>
        {emailError && <div className="error-message">{emailError}</div>}
        {emailSuccess && <div className="success-message">{emailSuccess}</div>}
        <label htmlFor="newEmail">New Email:</label>
        <input
          type="email"
          id="newEmail"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          disabled
        />
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          disabled
        />
        <button disabled onClick={handleChangeEmail}>Change Email</button>
      </div>
    </div>
  );
}

export default AuthDetails;
