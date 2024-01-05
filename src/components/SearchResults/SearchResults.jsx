import React from 'react';
import PetCard from '../PetCard/PetCard';
import './SearchResults.css';

export default function SearchResults({ petsData }) {
  return (
    <div className='search-results-container'>
      {petsData.map((pet) => (
        <PetCard key={pet.id} pet={pet} showLikeButton={true} />
      ))}
    </div>
  );
}