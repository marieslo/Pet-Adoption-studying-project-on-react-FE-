import React, { useState } from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LoginSignUpModal from '../LogInSignUp/LoginSignUpModal.jsx';
import './MyNavBar.css';
import { useAuth } from '../../context/AuthProvider.jsx';

import searchIcon from '../../styles/icons/pngwing.com.png';

export default function MyNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalShow, setModalShow] = useState(false);
  const [searchCategory, setSearchCategory] = useState('all');
  const { user, login, logout } = useAuth();

  const handleSearch = () => {
    navigate(`/search`);
  };

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

  const handleCategoryChange = (category) => {
    setSearchCategory(category);
  };

  const isBackButtonVisible = !user && location.pathname !== '/';
  const showSearchBar = location.pathname !== '/'; 

  return (
    <Navbar className="nav">
      {showSearchBar && (
        <Form inline className="mr-auto">
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={(e) => setSearchCategory(e.target.value)}
          />
          <Button variant="outline-success" onClick={handleSearch}>
            <img src={searchIcon} alt="Search" style={{ width: '20px', height: '20px' }} />
          </Button>
        </Form>
      )}

      <Navbar.Collapse className="justify-content-end">
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