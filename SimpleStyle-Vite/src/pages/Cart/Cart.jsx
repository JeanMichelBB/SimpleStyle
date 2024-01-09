// scr/pages/Cart/Cart.jsx
import React from 'react';
import '../../App.css';
import './Cart.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CartItem from '../../components/CartItem/CartItem';
import CartSummary from '../../components/CartSummary/CartSummary';

function Cart() {
  return (
    <>
      <Header />
      <h1>Cart</h1>
      <div className="cart-container">
        <div className="cart-item">
          <CartItem />
        </div>
        <div className="cart-summary">
          <CartSummary />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
