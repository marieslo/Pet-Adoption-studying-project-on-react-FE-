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
  const [loading, setLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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

    try {
      setLoading(true);

      await localforage.setItem('userData', userData);

      registeredUsers.push(userData);
      await localforage.setItem('registeredUsers', registeredUsers);
      setShowSuccessMessage(true);

      onSubmit(userData);

      setTimeout(() => {
        setShowSuccessMessage(false);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error during signup:', error);
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {showSuccessMessage && (
        <Alert variant="success">
          Signup successful! You can now log in. Don't forget to log in using your new credentials.
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