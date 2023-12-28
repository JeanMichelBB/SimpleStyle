// src/components/Hero/Hero.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'
import '../../App.css'

function Hero() {
    return (
        <div className='hero-container'>
            <video src='/videos/video-2.mp4' autoPlay loop muted />
            <h1>ADVENTURE AWAITS</h1>
            <p>What are you waiting for?</p>
            <div className='hero-btns'>
                <Link to='/sign-up' className='btn btn--outline btn--large'>GET STARTED</Link>
                <Link to='/products' className='btn btn--primary btn--large'>WATCH TRAILER <i className='far fa-play-circle' /></Link>
            </div>
        </div>
    )
}

export default Hero
