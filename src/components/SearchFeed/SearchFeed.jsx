import React, { useEffect } from 'react';
import { useFetchPets } from '../../context/FetchPetsContext';
import PetCard from '../PetCard/PetCard';
import './SearchFeed.css';

export default function SearchFeed({ items }) {
  const { petsData, loading, error, fetchPetsData } = useFetchPets();

  console.log('petsData:', petsData);

  const uniquePetsData = petsData.reduce((uniquePets, pet) => {
    const existingPet = uniquePets.find((p) => p.id === pet.id);
    if (!existingPet) {
      uniquePets.push(pet);
    }
    return uniquePets;
  }, []);

  return (
    <div className='search-feed-wrapper'>
      {loading && <p>Loading...</p>}
      <div className="pet-cards-container">
        {uniquePetsData.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}