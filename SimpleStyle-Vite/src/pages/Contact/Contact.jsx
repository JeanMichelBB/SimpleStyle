// src/pages/Contact.jsx
import React, { useState } from 'react';
import '../../App.css';
import './Contact.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <Header />
      <div className="content">
        <h1>Contact Us</h1>
        <p>
          Have a question or feedback? We'd love to hear from you! Fill out the
          form below, and we'll get back to you as soon as possible.
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
