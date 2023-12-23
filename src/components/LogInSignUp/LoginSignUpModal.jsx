import React, { useState } from 'react';
import { Modal, Nav, Tab } from 'react-bootstrap';
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
    navigate('/home', { state: { firstName: userData.firstName, lastName: userData.lastName } });
  };

  const handleLogin = (userData) => {
    onLogin(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    onHide();
    navigate('/home');
  };

  const getTabTitle = () => (isLoginPage ? 'Login' : 'Sign Up');

  return (
    <Modal show={show} onHide={onHide} centered>
      <Tab.Container activeKey={isLoginPage ? 'login' : 'signup'}>
        <Modal.Header closeButton>
          <Nav className='modal-tabs'>
            <Nav.Item>
              <Nav.Link className='tab-login' eventKey="login" onClick={handleTogglePage}>
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className='tab-signup' eventKey="signup" onClick={handleTogglePage}>
                Sign Up
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Header>
        <Modal.Body>
          <Tab.Content>
            <Tab.Pane eventKey="login">
              <LoginForm onSubmit={handleLogin} />
            </Tab.Pane>
            <Tab.Pane eventKey="signup">
              <SignUpForm onSubmit={handleSignup} />
            </Tab.Pane>
          </Tab.Content>
        </Modal.Body>
      </Tab.Container>
    </Modal>
  );
}
