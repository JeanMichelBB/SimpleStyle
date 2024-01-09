// src/pages/NotFound.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import './NotFound.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

function NotFound() {
    return (
        <>
        <Header />
        <h1>NotFound</h1>
        <div className="not-found">
            <h2>404</h2>
            <p>Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
            <Link to="/">Go back to the homepage</Link>
        </div>
        
       
        <Footer />
        </>
    )
    }

export default NotFound