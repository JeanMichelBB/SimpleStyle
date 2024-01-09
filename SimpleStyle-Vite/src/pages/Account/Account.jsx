// src/pages/Account/Account.jsx
import React from 'react';
import '../../App.css';
import './Account.css'; // Import the new CSS file
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AccountDetails from '../../components/AccountDetails/AccountDetails';
import OrdersDetails from '../../components/OrdersDetails/OrdersDetails';
import AuthDetails from '../../components/AuthDetails/AuthDetails';

function Account() {
  return (
    <>
      <Header />
      <h1>Account</h1>
      <div className="account-page-container">
        <AccountDetails />
        <AuthDetails />
        <OrdersDetails />
      </div>
      <Footer />
    </>
  );
}

export default Account;
