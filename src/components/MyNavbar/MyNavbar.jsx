import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LoginSignUpModal from '../LogInSignUp/LoginSignUpModal.jsx';
import './MyNavBar.css';
import { useAuth } from '../../context/AuthProvider.jsx';

export default function MyNavbar() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [searchCategory, setSearchCategory] = useState('all');
  const { user, login, logout } = useAuth();

  const handleSearch = () => {
    navigate(`/search?category=${searchCategory}`);
  };

  const handleModalOpen = () => {
    setModalShow(true);
  };

  const handleLogin = (userData) => {
    console.log('Logging in:', userData);
    login(userData);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCategoryChange = (category) => {
    setSearchCategory(category);
  };

  return (
    <Navbar className="nav">
      {user && (
        <>
          <Link to="/home">
            <span>Home</span>
          </Link>

          <Link to="/profile">
            <span>My Profile</span>
          </Link>

          <Link to="/mypets">
            <span>My Pets</span>
          </Link>
        </>
      )}

      {user ? (
        <span onClick={handleLogout}>Logout</span>
      ) : (
        <span onClick={handleModalOpen}>Login / Sign Up</span>
      )}

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