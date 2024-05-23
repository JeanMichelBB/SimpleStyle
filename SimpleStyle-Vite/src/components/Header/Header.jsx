import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../App.css';
import './Header.css';

function Header() {
  const [userInfo, setUserInfo] = useState(null);
  const [cartProductCount, setCartProductCount] = useState(0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8001/api/auth/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserInfo(userData);

          if (Array.isArray(userData.cart)) {
            const uniqueProductCount = new Set(userData.cart.map(item => item.product_id)).size;
            setCartProductCount(uniqueProductCount);
          }
        } else {
          alert('Please login again');
          console.error('Error fetching user info:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const isLoggedIn = localStorage.getItem('access_token') !== null;
    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    window.location.href = '/';
  };



  return (
    <>
      <header className="header">
        <div className="headerPrimary">
          <NavLink to="/" exact activeClassName="activeLink">
            Home
          </NavLink>
          <br />
          <NavLink to="/About" activeClassName="activeLink">
            About
          </NavLink>
          <br />
          <NavLink to="/Contact" activeClassName="activeLink">
            Contact
          </NavLink>
          <br />
        </div>
        <div className="headerSecondary">
          {userInfo ? (
            <>
              <NavLink to="/Account" activeClassName="activeLink">
                {`Hello, ${userInfo.name}`}
              </NavLink>
              <br />
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <NavLink to="/Login" activeClassName="activeLink">
              Login
            </NavLink>
          )}
          <br />
          <NavLink to="/Cart" activeClassName="activeLink">
            Cart {Array.isArray(userInfo?.cart) && userInfo.cart.length > 0 && `(${cartProductCount})`}
          </NavLink>

          <br />
        </div>
      </header>
    </>
  );

}

export default Header;
