import React, { useEffect, useState } from 'react';
import PetCard from '../components/PetCard/PetCard';
import localforage from 'localforage';

export default function PetsOwners({ userId }) {
  const [userPets, setUserPets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        const storedUserPets = await localforage.getItem(`userPets_${userId}`) || [];
        setUserPets(storedUserPets);
      } catch (error) {
        console.error('Error fetching user pets:', error);
        setError('Error fetching user pets. Please try again.');
      }
    };

    fetchUserPets();
  }, [userId]);

  return (
    <div className="user-pets-page-container">
      {error ? (
        <p className="error-message">{error}</p>
      ) : userPets.length > 0 ? (
        <div className="pets-list">
          {userPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      ) : (
        <p>No pets</p>
      )}
    </div>
  );
}