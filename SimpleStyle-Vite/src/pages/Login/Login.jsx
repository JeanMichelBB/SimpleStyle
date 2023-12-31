// src/pages/Login/Login.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import './Login.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import LoginForm from '../../components/LoginForm/LoginForm'

function Login() {
    return (
        <>
        <Header />
        <h1>Login</h1>
        <LoginForm />
       
        <Footer />
        </>
    )
    }

export default Login