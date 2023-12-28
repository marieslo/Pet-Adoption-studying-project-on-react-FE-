import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
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

  const isAdmin = user && user.isAdmin;

  const activeLinkStyle = {
    color: '#FF0000', 
    fontWeight: 'bold', 
  };

  return (
    <Navbar className="nav" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-start">
        <Nav className="mr-auto">
          {!isAdmin && location.pathname !== '/' && (
            <NavLink to="/" className="nav-link">
              Back
            </NavLink>
          )}

          {user && (
            <>
              <NavLink
                to="/home"
                className="nav-link"
                style={location.pathname === '/home' ? activeLinkStyle : {}}
              >
                Home
              </NavLink>

              <NavLink
                to="/profile"
                className="nav-link"
                style={location.pathname === '/profile' ? activeLinkStyle : {}}
              >
                My Profile
              </NavLink>

              <NavLink
                to="/mypets"
                className="nav-link"
                style={location.pathname === '/mypets' ? activeLinkStyle : {}}
              >
                My Pets
              </NavLink>

              <NavLink
                to="/search"
                className="nav-link"
                style={location.pathname === '/search' ? activeLinkStyle : {}}
              >
                Search
              </NavLink>
            </>
          )}

          {isAdmin && user && (
            <>
              <NavLink
                to="/petsdashboard"
                className="nav-link admin-link"
                style={location.pathname === '/petsdashboard' ? activeLinkStyle : {}}
              >
                Pets' Dashboard
              </NavLink>

              <NavLink
                to="/usersdashboard"
                className="nav-link admin-link"
                style={location.pathname === '/usersdashboard' ? activeLinkStyle : {}}
              >
                Users' Dashboard
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar.Collapse>

      <Navbar.Collapse className="justify-content-end">
        {user ? (
          <>
            <span onClick={handleLogout} className="nav-link">
              Log Out
            </span>
          </>
        ) : (
          <span onClick={handleModalOpen} className="nav-link">
            Log In / Sign Up
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