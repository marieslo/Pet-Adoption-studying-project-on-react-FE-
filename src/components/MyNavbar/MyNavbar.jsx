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

  return (
    <Navbar className="nav" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-start">
        <Nav className="mr-auto">
          {!isAdmin && location.pathname !== '/' && (
            <NavLink to="/" className="nav-link" activeClassName="active">
              Back
            </NavLink>
          )}

          {user && (
            <>
              <NavLink to="/home" className="nav-link" activeClassName="active">
                Home
              </NavLink>

              <NavLink to="/profile" className="nav-link" activeClassName="active">
                My Profile
              </NavLink>

              <NavLink to="/mypets" className="nav-link" activeClassName="active">
                My Pets
              </NavLink>

              <NavLink to="/search" className="nav-link" activeClassName="active">
                Search
              </NavLink>
            </>
          )}

          {isAdmin && user && (
            <>
              <NavLink to="/petsdashboard" className="nav-link admin-link" activeClassName="active">
                Pets' Dashboard
              </NavLink>

              <NavLink to="/usersdashboard" className="nav-link admin-link" activeClassName="active">
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