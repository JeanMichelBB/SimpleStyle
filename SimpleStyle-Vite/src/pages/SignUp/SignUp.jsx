// src/pages/SignUp/SignUp.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import './SignUp.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import SignUpForm from '../../components/SignUpForm/SignUpForm'

function SignUp() {
    return (
        <>
        <Header />
        <h1>SignUp</h1>
        <SignUpForm />
       
        <Footer />
        </>
    )
    }

export default SignUp