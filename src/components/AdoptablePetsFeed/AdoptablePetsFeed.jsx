import React, { useEffect, useState, useContext } from 'react';
import PetCard from '../PetCard/PetCard';
import { Spinner } from 'react-bootstrap';
import { useFetchPets } from '../../context/FetchPetsContext';
import { AuthContext } from '../../context/AuthProvider'; 
import './AdoptablePetsFeed.css';

export default function AdoptablePetsFeed() {
  const { petsData, loading, error, fetchPetsData } = useFetchPets();
  const [adoptablePetsData, setAdoptablePetsData] = useState([]);
  const { isAuthenticated, user } = useContext(AuthContext);

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

  const handleLike = (petId) => {
    if (isAuthenticated) {
      console.log(`User ${user.username} liked pet with ID ${petId}`);
    } else {
      console.log('Please log in to like pets');
    }
  };

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
            <PetCard
              key={pet.id}
              pet={pet}
              onLike={() => handleLike(pet.id)}  
              showAdoptionStatus={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}