// scr/pages/Cart/Cart.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import './Cart.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import CartItem from '../../components/CartItem/CartItem';


function Cart() {
    return (
        <>
        <Header />
        <h1>Cart</h1>
        <CartItem />
        <Footer />
        </>
    )
    }

export default Cart