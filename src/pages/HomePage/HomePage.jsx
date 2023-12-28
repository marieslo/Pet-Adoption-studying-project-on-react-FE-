import React from 'react';
import './HomePage.css';
import { useAuth } from '../../context/AuthProvider';
import AdoptablePetsFeed from '../../components/AdoptablePetsFeed/AdoptablePetsFeed';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home-page-container">
      <div className="home-page-greeting">
        {user && (
          <div className="home-page-call-to-action">
            <p>
              Glad to see you here, {user.firstName} {user.lastName}!
              <br />
              <br />Transform your life,
              <br />adopt a furry friend today!
              <br />
              <br/> They need your love
            </p>
          </div>
        )}
      </div>
      <div className="home-page-allpetsfeed-container">
        <AdoptablePetsFeed />
      </div>
    </div>
  );
}