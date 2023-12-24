import React from 'react';
import SearchButton from '../../components/SearchButton/SearchButton';
import SearchFeedFragment from '../../components/SearchFeed/SearchFeedFragment';
import './WelcomePage.css';

export default function WelcomePage() {
  

  return (
    <div className='welcome-page-container'>
        <section className='welcome-text'>
          <p>Are you planning to adopt a pet?</p>
          <p>We have numerous pets in need patiently waiting for a loving home.</p>
          <p>We'll make your adoption process seamless.</p>
        </section>
        <SearchButton />
    <SearchFeedFragment />
    </div>
  );
}