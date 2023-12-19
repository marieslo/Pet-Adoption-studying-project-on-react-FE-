import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import localforage from 'localforage';

import './LoginSignUp.css';

export default function SignUpForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const userData = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    };

    await localforage.setItem('userData', userData);
    onSubmit(userData);
  };

  return (
    <Form onSubmit={handleSubmit}>
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
        Sign Up
      </button>
    </Form>
  );
}