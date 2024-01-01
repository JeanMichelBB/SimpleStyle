import React, { useState } from 'react';
import './SignUpForm.css'; 

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    console.log('Sign Up clicked:', email, password);

    fetch('http://127.0.0.1:8000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    
      .then((response) => {
        if (response.ok) {
          window.location.href = '/login';

          alert('Sign up successful! Please log in.');

        } else {
          response.json().then((data) => {
            setError(data.message);
          });
        }
      })
      .catch((error) => {
        console.error('Error signing up:', error);
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
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignUpForm;
