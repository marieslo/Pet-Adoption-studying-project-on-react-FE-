import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './WelcomePage.css'; 
import Header from '../../components/Header/Header'

export default function WelcomePage() {
  const navigate = useNavigate(); 

  const handleSearch = () => {

    navigate('/search?category=all');
  };

  return (
    <div className='welcome-page-container'>
      <Header/>
      <section className='welcome-text'>
        Open your heart to a furry friend for whom you'll be their whole world
      </section>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}