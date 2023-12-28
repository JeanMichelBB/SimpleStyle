// src/components/Header.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import './Header.css'


function Header() {
    return (
        <>
            <header className="header">
                <div className="headerPrimary">
                <Link to="/">Home</Link>
                <br />
                <Link to="/About">About</Link>
                <br />
                <Link to="/Contact">Contact</Link>
                <br />
                </div>
                <div className="headerSecondary">
                <Link to="/Login">Login</Link>
                <br />
                <Link to="/Account">Account</Link>
                <br />
                <Link to="/Cart">Cart</Link>
                <br />
                <Link to="/AdminPage">AdminPage</Link>
                </div>
            </header>
        </>
    )
}

export default Header