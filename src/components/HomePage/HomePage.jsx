import React from 'react';
import './HomePage.css';
import MyNavbar from './MyNavBar/MyNavBar';
import { useAuth } from '../../context/AuthProvider';

export default function HomePage() {
  const { user, login, logout } = useAuth();

  return (
    <div className='home-page-container'>
      {user && (
        <div className='user-greeting'>Hello, {user.firstName}!</div>
      )}
      <MyNavbar />
      <section className='welcome-text'>
        Open your heart to a furry friend for whom you'll be their whole world
      </section>
    </div>
  );
}