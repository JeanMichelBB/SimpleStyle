// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import SignIn from './pages/SignUp/SignUp';
import Account from './pages/Account/Account';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Products from './pages/Products/Products';
import AdminPage from './pages/AdminPage/AdminPage';

import './App.css';

function App() {
  return (
    
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/About">
            <About />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/SignIn">
            <SignIn />
          </Route>
          <Route path="/Account">
            <Account />
          </Route>
          <Route path="/Cart">
            <Cart />
          </Route>
          <Route path="/Checkout">
            <Checkout />
          </Route>
          <Route path="/Products">
            <Products />
          </Route>
          <Route path="/AdminPage">
            <AdminPage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    
  );
}

export default App;
