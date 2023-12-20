import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom'; 
import './LoginSignUp.css';

export default function LoginSignUpModal({ show, onHide, onSignup, onLogin }) {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const navigate = useNavigate();

  const handleTogglePage = () => {
    setIsLoginPage(!isLoginPage);
  };

  const handleSignup = (userData) => {
    onSignup(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    registeredUsers.push({ email: userData.email, password: userData.password });
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    onHide();
    navigate('/home');
  };

  const handleLogin = (userData) => {
    onLogin(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    onHide();
    navigate('/home');
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isLoginPage ? 'Login' : 'Sign Up'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoginPage ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <SignUpForm onSubmit={handleSignup} />
        )}
        <hr />
        <button className='modal-btn' onClick={handleTogglePage}>
          {isLoginPage ? 'Switch to Sign Up' : 'Switch to Login'}
        </button>
      </Modal.Body>
    </Modal>
  );
}