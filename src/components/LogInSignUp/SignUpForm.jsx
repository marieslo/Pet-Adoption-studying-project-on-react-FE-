import React, { useState, useEffect } from 'react';
import { Form, Alert, Spinner } from 'react-bootstrap';
import localforage from 'localforage';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { useAuth } from '../../context/AuthProvider';

import './LoginSignUp.css';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, updateUser } = useAuth();
  const [invalidFields, setInvalidFields] = useState([]);
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();

  const generateUniqueId = () => {
    return nanoid();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInvalidFields([]);
    setErrorMessages({
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    });

    if (password !== confirmPassword) {
      setInvalidFields((prevInvalidFields) => [...prevInvalidFields, 'password', 'confirmPassword']);
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        password: "Passwords don't match",
        confirmPassword: "Passwords don't match",
      }));
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setInvalidFields((prevInvalidFields) => [...prevInvalidFields, 'password']);
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        password: 'Password must contain at least 8 characters, including 1 capital letter and 1 digit.',
      }));
      return;
    }

    const phoneNumberRegex = /^\d{6,}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      setInvalidFields((prevInvalidFields) => [...prevInvalidFields, 'phoneNumber']);
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        phoneNumber: 'Phone number must contain at least 6 digits.',
      }));
      return;
    }

    try {
      const registeredUsers = (await localforage.getItem('registeredUsers')) || [];
      const isEmailUnique = registeredUsers.every((user) => user.email !== email);

      if (!isEmailUnique) {
        setInvalidFields((prevInvalidFields) => [...prevInvalidFields, 'email']);
        setErrorMessages((prevErrorMessages) => ({
          ...prevErrorMessages,
          email: 'Email is already registered. Please use a different email.',
        }));
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

      await localforage.setItem('userData', userData);
      registeredUsers.push(userData);
      await localforage.setItem('registeredUsers', registeredUsers);

      login({ email, password, firstName, lastName, phoneNumber });
      updateUser(userData);
      setShowSuccessMessage(true);

      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  useEffect(() => {
    if (showSuccessMessage) {
      navigate('/home');
    }
  }, [showSuccessMessage, navigate]);

  return (
    <Form onSubmit={handleSubmit}>
      {showSuccessMessage && (
        <Alert variant="success">
          Signup successful!
        </Alert>
      )}

      <Form.Group controlId="formBasicEmail" className={invalidFields.includes('email') ? 'invalid' : ''}>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errorMessages.email && <small className="text-danger">{errorMessages.email}</small>}
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className={invalidFields.includes('password') ? 'invalid' : ''}>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessages.password && <small className="text-danger">{errorMessages.password}</small>}
      </Form.Group>

      <Form.Group controlId="formBasicConfirmPassword" className={invalidFields.includes('confirmPassword') ? 'invalid' : ''}>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errorMessages.confirmPassword && <small className="text-danger">{errorMessages.confirmPassword}</small>}
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

      <Form.Group controlId="formBasicPhoneNumber" className={invalidFields.includes('phoneNumber') ? 'invalid' : ''}>
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {errorMessages.phoneNumber && <small className="text-danger">{errorMessages.phoneNumber}</small>}
      </Form.Group>

      <button className="switch-login-signup-btn" type="submit">
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