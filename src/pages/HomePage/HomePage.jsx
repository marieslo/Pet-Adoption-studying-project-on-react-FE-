import React from 'react';
import './HomePage.css';
import { useAuth } from '../../context/AuthProvider';
import SearchFeedFragment from '../../components/SearchFeed/SearchFeedFragment';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className='home-page-container'>
      <div className='home-page-greeting'>
        {user && (
          <div className='home-page-call-to-action'>
            <p>Welcome, {user.firstName} {user.lastName}!</p>
            <p>Transform your life, adopt a furry friend today!</p>
          </div>
        )}
      </div>
      <div className='home-page-searchfeed-container'>
        <SearchFeedFragment />
      </div>
    </div>
  );
}