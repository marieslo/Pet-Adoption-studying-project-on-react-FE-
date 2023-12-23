import React from 'react';
import './HomePage.css';
import { useAuth } from '../../context/AuthProvider';
import SearchCategoryCard from '../../components/SearchCategoryCard/SearchCategoryCard'

export default function HomePage({ onSearch }) {
  const { user } = useAuth();

  return (
    <div className='home-page-container'>
      <div className='home-page-greeting'>
        {user ? (
          <div className='home-page-call-to-action'>
            <p>Welcome, {user.firstName} {user.lastName}!</p>
            <p>Transform your life, adopt a furry friend today!</p>
          </div>
        ) : (
          <p>Transform your life, adopt a furry friend today!</p>
        )}
      </div>
      <div className='category-cards-container'>
        <SearchCategoryCard category="Dogs" onClick={() => onSearch({ type: 'dog' })} />
        <SearchCategoryCard category="Cats" onClick={() => onSearch({ type: 'cat' })} />
        <SearchCategoryCard
          category="Other Animals"
          onClick={() => onSearch({ type: 'other animals' })}
        />
      </div>
    </div>
  );
}