import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LoginSignUp.css';

export default function LoginForm({ onSubmit, onSignupRedirect }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isUserRegistered = () => {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
      return registeredUsers.some(user => user.email === email && user.password === password);
    };
    if (!isUserRegistered) {
      setShowAlert(true);
      return;
    }
    onSubmit({ email, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {showAlert && (
        <Alert variant="danger">
          User not registered.{' '}
          <Link to="/signup" onClick={onSignupRedirect}>
            Sign up here.
          </Link>
        </Alert>
      )}

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <button className="login-btn btn" type="submit">
        Login
      </button>
    </Form>
  );
}