// src/pages/About.jsx
import React from 'react';
import '../../App.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <>
      <Header />
      <div className="content">
        <h1>About Us</h1>
        <p>
          Welcome to our clothing store! We are passionate about providing
          high-quality fashion that reflects your style. Our mission is to offer
          a curated collection of trendy and comfortable clothing for every
          occasion.
        </p>
        <p>
          At SimpleStyle, we believe that fashion should be accessible to
          everyone. Whether you're looking for the latest trends or timeless
          classics, we've got you covered.
        </p>
        <p>
          Our dedicated team is committed to delivering exceptional customer
          service. If you have any questions or need assistance, feel free to
          reach out to us through our <Link to="/contact">Contact page</Link>.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default About;
