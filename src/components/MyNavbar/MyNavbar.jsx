import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LoginSignUpModal from '../LogInSignUp/LoginSignUpModal.jsx';
import './MyNavBar.css';
import { useAuth } from '../../context/AuthProvider.jsx';

export default function MyNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalShow, setModalShow] = useState(false);
  const { user, login, logout } = useAuth();


  const handleModalOpen = () => {
    setModalShow(true);
  };

  const handleLogin = (userData) => {
    login(userData);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isBackButtonVisible = !user && location.pathname !== '/';

  return (
    <Navbar className="nav">

      <Navbar.Collapse className="justify-content-start">
        {isBackButtonVisible && (
          <Link to="/">
            <span className='navbar-btn'>Back</span>
          </Link>
        )}

        {user && (
          <>
            <Link to="/home">
              <span className='navbar-btn'>Home</span>
            </Link>

            <Link to="/profile">
              <span className='navbar-btn'>My Profile</span>
            </Link>

            <Link to="/mypets">
              <span className='navbar-btn'>My Pets</span>
            </Link>

            <Link to="/search">
              <span className='navbar-btn'>Search</span>
            </Link>
          </>
        )}

        {user ? (
          <>
            <span onClick={handleLogout} className='navbar-btn'>
              Logout
            </span>
          </>
        ) : (
          <span onClick={handleModalOpen} className='navbar-btn'>
            Login / Sign Up
          </span>
        )}
      </Navbar.Collapse>

      <LoginSignUpModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSignup={(userData) => {
          console.log('Signing up:', userData);
        }}
        onLogin={handleLogin}
      />
    </Navbar>
  );
}