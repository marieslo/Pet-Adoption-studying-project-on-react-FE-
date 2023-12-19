import React from 'react';
import './HomePage.css';
import { useAuth } from '../../context/AuthProvider';

export default function HomePage() {
  const { user, login, logout } = useAuth();

  return (
    <div className='home-page-container'>
      {user && (
        <div className='user-greeting'>Hello, {user.firstName}!</div>
      )}
    
    </div>
  );
}