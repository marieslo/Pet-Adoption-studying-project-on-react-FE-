import React, { useState } from 'react';
import { Form, Alert, Spinner } from 'react-bootstrap';
import localforage from 'localforage';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

import './LoginSignUp.css';

export default function SignUpForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const generateUniqueId = () => {
    return nanoid();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const userData = {
      id: generateUniqueId(),
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    };

    try {
      setLoading(true);

      await localforage.setItem('userData', userData);

      const registeredUsers = (await localforage.getItem('registeredUsers')) || [];
      registeredUsers.push(userData);
      await localforage.setItem('registeredUsers', registeredUsers);
      setShowSuccess(true);

      onSubmit(userData);

      setTimeout(() => {
        setShowSuccess(false);
        setLoading(false);
        navigate('/home');
      }, 500);
    } catch (error) {
      console.error('Error during signup:', error);
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {showSuccess && (
        <Alert variant="success">
          Signup successful! You can now log in.
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

      <Form.Group controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>

      <button className='switch-login-signup-btn' type="submit">
        {loading ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            {' Loading...'}
          </>
        ) : (
          'Sign Up'
        )}
      </button>
    </Form>
  );
}