// src/pages/Checkout/Checkout.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import './Checkout.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ItemCheckout from '../../components/ItemCheckout/ItemCheckout'

function Checkout() {
    return (
        <>
        <Header />
        <h1>Checkout</h1>
        <ItemCheckout />
       
        <Footer />
        </>
    )
    }

export default Checkout