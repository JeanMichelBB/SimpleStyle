// src/components/Hero/Hero.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'
import '../../App.css'

function Hero() {
    return (
        <div className='hero-container'>
            <h1>Welcome to SimpleStyle</h1>
            <p>What are you waiting for?</p>
        </div>
    )
}

export default Hero
