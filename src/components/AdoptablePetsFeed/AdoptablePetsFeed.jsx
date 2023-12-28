import React, { useEffect, useState } from 'react';
import PetCard from '../PetCard/PetCard';
import { Spinner } from 'react-bootstrap';
import { useFetchPets } from '../../context/FetchPetsContext';
import './AdoptablePetsFeed.css';

export default function AdoptablePetsFeed () {
  const { petsData, loading, error, fetchPetsData } = useFetchPets();
  const [adoptablePetsData, setAdoptablePetsData] = useState([]);

  useEffect(() => {
    const fetchAdoptablePets = async () => {
      try {
        await fetchPetsData();
      } catch (error) {
        console.error('Error fetching pets:', error.message);
      }
    };

    fetchAdoptablePets();
  }, [fetchPetsData]);

  useEffect(() => {
    const adoptablePets = petsData.filter((pet) => pet.adoptionStatus === 'adoptable');
    setAdoptablePetsData(adoptablePets);
  }, [petsData]);

  return (
    <div className='allpets-feed-wrapper'>
      {loading ? (
        <Spinner animation="grow" variant="light">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="pet-cards-container">
          {adoptablePetsData.slice().reverse().map((pet) => (
            <PetCard key={pet.id} pet={pet} onLike={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
