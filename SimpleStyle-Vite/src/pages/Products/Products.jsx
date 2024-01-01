// src/pages/Products/Products.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import './Products.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ProductDetails from '../../components/ProductDetails/ProductDetails'

function Products() {
    return (
        <>
        <Header />
        <ProductDetails />
        <Footer />
        </>
    )
    }

export default Products