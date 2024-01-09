import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';
import UserModel from '../../Models/UserModel';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [hashed_password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();
    const [loading, setLoading] = useState(false); // Define the loading state
    

    const handleLogin = () => {
        setLoading(true);

        const userData = new UserModel();
        userData.email = email;
        userData.hashed_password = hashed_password;
        
        
        fetch('http://127.0.0.1:8000/api/auth/login', {
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
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('access_token', data.access_token);
                console.log('token', data.access_token  );
                window.location.href = '/';
                alert('Login successful!');
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                console.error('Error details:', error.message); 
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSignIn = () => {
        history.push('/signin');
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
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
                    value={hashed_password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleSignIn}>Sign In</button>
            </div>
        </div>
    );
};

export default LoginForm;
