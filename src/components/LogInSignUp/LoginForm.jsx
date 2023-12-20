import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import localforage from 'localforage';

import './LoginSignUp.css';

export default function LoginForm({ onSubmit, onSignupRedirect }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registeredUsers = await localforage.getItem('registeredUsers') || [];

    const user = registeredUsers.find((user) => user.email === email);

    if (!user) {
      setShowAlert(true);
      return;
    }


    onSubmit({ email, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {showAlert && (
        <Alert variant="danger">
          User not registered or incorrect password.{' '}
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

      <button className="switch-login-signup-btn" type="submit">
        Login
      </button>
    </Form>
  );
}