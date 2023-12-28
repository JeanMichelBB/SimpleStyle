// src/pages/Home.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import './Home.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Hero from '../../components/Hero/Hero'
import ProductList from '../../components/ProductList/ProductList'

function Home() {
    return (
        <>
        <Header />
        <Hero />
        <ProductList />

        <Footer />
        </>
    )
    }

export default Home