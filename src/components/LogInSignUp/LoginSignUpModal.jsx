import React, { useState } from 'react';
import { Modal, Nav, Tab, Form, Button } from 'react-bootstrap';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';
import localforage from 'localforage';

export default function LoginSignUpModal({ show, onHide, onSignup, onLogin }) {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  const handleTogglePage = () => {
    setIsLoginPage(!isLoginPage);
  };

  const handleCheckboxChange = () => {
    setIsAdminLogin(!isAdminLogin);
  };

  const handleSignup = async (userData) => {
    onSignup(userData);
    const registeredUsers = (await localforage.getItem('registeredUsers')) || [];
    registeredUsers.push({ email: userData.email, password: userData.password });
    await localforage.setItem('registeredUsers', registeredUsers);
    await localforage.setItem('userData', userData);
    onHide();
    // navigate('/home', { state: { firstName: userData.firstName, lastName: userData.lastName } });
  };

  const handleLogin = (userData) => {
    onLogin({ ...userData, isAdmin: isAdminLogin });
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
              <Form.Group controlId="isAdminCheckbox" className="checkbox-label">
                <Form.Check
                  className='checkbox-input'
                  type="checkbox"
                  label="Login as Admin"
                  checked={isAdminLogin}
                  onChange={handleCheckboxChange}
                />
                <div className="checkbox-checkmark"></div>
              </Form.Group>
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