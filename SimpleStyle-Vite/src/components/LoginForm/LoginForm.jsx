import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';
import UserModel from '../../Models/UserModel';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [hashed_password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [emailSelected, setEmailSelected] = useState(false); // State to track if email is selected
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8001/api/v1/users', {
            method: 'GET',
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
            setUsers(data);
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        });
    }, []);

    const handleLogin = () => {
        setLoading(true);

        const userData = new UserModel();
        userData.email = email;
        userData.hashed_password = hashed_password;

        fetch('http://127.0.0.1:8001/api/auth/login', {
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
            console.log('token', data.access_token);
            window.location.href = '/';
            alert('Login successful!');
        })
        .catch((error) => {
            console.error('Error logging in:', error);
            console.error('Error details:', error.message);
            setError('Login failed. Please try again.');
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const handleSignIn = () => {
        history.push('/signin');
    };

    const handleSuggestionClick = (clickedEmail) => {
        setEmail(clickedEmail); 
        setPassword('password');
        setShowSuggestions(false);
        setEmailSelected(true); // Mark email as selected
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    disabled={emailSelected} // Disable the email input if email is selected
                />
                {showSuggestions && (
                    <div className="suggestion-box" onFocus={() => setShowSuggestions(true)} onBlur={() => setShowSuggestions(false)}>
                        <ul>
                            {users.map((user) => (
                                <li key={user.id} onClick={() => handleSuggestionClick(user.email)}>{user.email}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    value={hashed_password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={emailSelected} // Disable the email input if email is selected
                />
            </div>
            <div className="form-group form-group-buttons">
                <button onClick={handleLogin} disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <button onClick={handleSignIn}>Sign In</button>
            </div>
        </div>
    );
};

export default LoginForm;
