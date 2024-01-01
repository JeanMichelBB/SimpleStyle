import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Login clicked:', email, password);
        fetch('http://127.0.0.1:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (response.ok) {
                    // Redirect to home page
                    window.location.href = '/';
                    alert('Login successful!');
                } else {
                    response.json().then((data) => {
                        console.log(data);
                    });
                }
            })
            .catch((error) => {
                console.error('Error logging in:', error);
            });
    };

    const handleSignIn = () => {
        console.log('Sign In clicked:', email, password);
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
                    value={password}
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
