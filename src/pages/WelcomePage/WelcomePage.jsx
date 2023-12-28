import React from 'react';
import ButtonToSearchPage from '../../components/ButtonToSearchPage/ButtonToSearchPage';
import AdoptablePetsFeed from '../../components/AdoptablePetsFeed/AdoptablePetsFeed';
import './WelcomePage.css';

export default function WelcomePage() {
  return (
    <div className='welcome-page-container'>
      <section className='welcome-text'>
        <p>Are you planning to adopt a pet?</p>
        <p>We have dogs, cats and other pets in need patiently waiting for a loving home.</p>
        <p>They need your love</p>
      </section>
      <ButtonToSearchPage />
      <div className='welcome-page-allpetsfeed-container'>
        <AdoptablePetsFeed />
      </div>
    </div>
  );
}
