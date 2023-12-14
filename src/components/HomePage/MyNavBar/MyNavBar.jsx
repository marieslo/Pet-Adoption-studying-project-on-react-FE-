import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginSignUpModal from '../LogInSignUp/LoginSignUpModal.jsx';
import './MyNavBar.css';
import { useAuth } from '../../../context/AuthProvider.jsx';

export default function MyNavbar() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const { user, login, logout } = useAuth();

  const handleSearch = () => {
    navigate('/search');
  };

  const handleModalOpen = () => {
    setModalShow(true);
  };

  const handleLogin = (userData) => {
    console.log('Logging in:', userData);
    login(userData);
  };

  return (
    <Navbar className="bg-body-tertiary justify-content-between">
      <div className="d-flex align-items-center flex-column">
        {!user && ( 
          <>
            <button
              className="btn-to-modal btn-1 navbarbtn1"
              onClick={handleModalOpen}
            >
              <span>Sign Up</span>
              <span>Login</span>
            </button>

            <button
              className="search-btn btn-2 navbarbtn2"
              type="button"
              onClick={handleSearch}
            >
              <span>Search</span>
            </button>
          </>
        )}
      </div>

      <LoginSignUpModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSignup={(userData) => {
          // Implement your signup logic here
          console.log('Signing up:', userData);
        }}
        onLogin={handleLogin}
      />

      {user && <button onClick={logout}>Logout</button>}
    </Navbar>
  );
}