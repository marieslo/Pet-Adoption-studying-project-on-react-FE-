import React, { useState, useEffect } from 'react';
import SearchButton from '../../components/SearchButton/SearchButton';
import SearchFeed from '../../components/SearchFeed/SearchFeed';
import './WelcomePage.css';

export default function WelcomePage({ onSearch }) {
  const [randomPets, setRandomPets] = useState([]);

  const generateRandomIndices = (max, count) => {
    const indices = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  useEffect(() => {
    const fetchAllPets = async () => {
      try {
        const allPetsData = await useFetchPetsData(); 
        const randomIndices = generateRandomIndices(allPetsData.length, 3);
        const randomPetsData = randomIndices.map((index) => allPetsData[index]);
        setRandomPets(randomPetsData);
      } catch (error) {
        console.error('Error fetching pet data:', error.message);
      }
    };

    fetchAllPets();
  }, []);

  return (
    <div className='welcome-page-container'>
      <div className='wrapper-for-header-welcometext-and-search-btn'>
        <section className='welcome-text'>
          <p>Are you planning to adopt a pet?</p>
          <p>We'll make the adoption process seamless and informed.</p>
          <p>What makes us different?</p>
          <p>We collaborate with shelters to provide loving homes for pets in need.</p>
        </section>
        <SearchButton />
      </div>
      <div className='random-pets-container'>
        <SearchFeed items={randomPets} />
      </div>
    </div>
  );
}