import React, { useState } from 'react';
import './SignUpForm.css';
import UserModel from '../../Models/UserModel';
import { faker } from '@faker-js/faker';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [hashed_password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fakeDataGenerated, setFakeDataGenerated] = useState(false); // Track if fake data is generated

  const generateFakeData = () => {
    const fakeEmail = faker.internet.email();
    const fakePassword = "password";
    const fakeName = faker.name.firstName();
    const fakeLastName = faker.name.lastName();

    setEmail(fakeEmail);
    setPassword(fakePassword);
    setConfirmPassword(fakePassword); // Keep passwords consistent
    setName(fakeName);
    setLastName(fakeLastName);

    // Set fake data generated flag to true
    setFakeDataGenerated(true);
  };

  const handleSignUp = () => {
    if (!fakeDataGenerated) {
      setError('Please generate fake data before submitting');
      return;
    }
    setLoading(true);

    if (!email || !hashed_password || !confirmPassword || !name || !lastName) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address');
      setLoading(false);
      return;
    }

    if (hashed_password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    const userData = new UserModel();
    userData.email = email;
    userData.hashed_password = hashed_password;
    userData.name = name;
    userData.last_name = lastName;

    fetch('http://127.0.0.1:8001/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Signup success:', data);

        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('access_token', data.access_token);

        // Delete the first user after successful signup
        return handleDeleteRequest();
      })
      .then(() => {
        window.location.href = '/';
        alert('Signup successful!');
      })
      .catch(async (error) => {
        console.error('Error signing up:', error);

        try {
          if (error.response) {
            const response = await error.response.json();
            if (response && response.detail) {
              setError(`Bad Request: ${response.detail}`);
            } else {
              setError(`Bad Request: ${JSON.stringify(response)}`);
            }
          } else {
            setError('Bad Request: Unable to fetch error details');
          }
        } catch (jsonError) {
          setError('Bad Request: Unable to parse error response');
        }

        setLoading(false);
      });
  };

  const handleDeleteRequest = () => {
    return fetch('http://localhost:8001/api/v1/first', {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Delete request success:', data);
      })
      .catch((error) => {
        console.error('Error with delete request:', error);
        setError('Error with delete request');
      });
  };

  return (
    <div className="sign-in-form-container">
      <h2>Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onClick={generateFakeData}
          disabled={fakeDataGenerated}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={hashed_password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={generateFakeData} // Clicking on any field will generate fake data
          disabled={fakeDataGenerated}
        />
      </div>
      <div className="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={fakeDataGenerated}
        />
      </div>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onClick={generateFakeData}
          disabled={fakeDataGenerated}
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onClick={generateFakeData}
          disabled={fakeDataGenerated}
        />
      </div>
      <div className="form-group">
        <button onClick={handleSignUp} disabled={!fakeDataGenerated || loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
