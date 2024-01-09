// src/components/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import './Footer.css'

function Footer() {
    return (
        <>
            <div className="footer-container">
                <footer className='footer'>
                    <ul className='footer'>
                        <li className='footer__item'>
                            <Link to='/' className='footer__link'>Home</Link>
                        </li>
                        <li className='footer__item'>
                            <Link to='/about' className='footer__link'>About</Link>
                        </li>
                        <li className='footer__item'>
                            <Link to='/contact' className='footer__link'>Contact</Link>
                        </li>
                        <li className='footer__item'>
                            <Link to='/login' className='footer__link'>Login</Link>
                        </li>
                        <li className='footer__item'>
                            <Link to='/account' className='footer__link'>Account</Link>
                        </li>
                        <li className='footer__item'>
                            <Link to='/cart' className='footer__link'>Cart</Link>
                        </li>
                        <li className='footer__item'>
                            <Link to="/AdminPage">AdminPage</Link>
                        </li>
                    </ul>
                    <div className='footer__signature'>
                    <p className='footer__image-text'>Image provided by <a href='https://unsplash.com/' target='_blank' rel='noopener noreferrer'>Unsplash</a></p>

                        <p className='footer__signature-text'>Created by <a href='https://github.com/JeanMichelBB'>Jean-Michel</a></p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer