import React, { useEffect, useState, useCallback } from 'react';
import PetCard from '../../components/PetCard/PetCard';
import localforage from 'localforage';
import './MyPetsPage.css';
import SearchButton from '../../components/SearchButton/SearchButton';

export default function MyPetsPage() {
  const [likedPets, setLikedPets] = useState([]);

  const setLikedPetsAsync = useCallback(async (callback) => {
    setLikedPets((prev) => {
      const updated = callback(prev);
      return updated;
    });
  }, []);

  useEffect(() => {
    const fetchLikedPets = async () => {
      try {
        const storedLikedPets = await localforage.getItem('likedPets') || [];
        setLikedPets(storedLikedPets);
      } catch (error) {
        console.error('Error fetching liked pets:', error);
      }
    };

    fetchLikedPets();
  }, []);

  const handleLikeToggle = async (pet, isLiked) => {
    setLikedPets((prevLikedPets) => {
      if (isLiked) {
        return [...prevLikedPets, pet];
      } else {
        return prevLikedPets.filter((likedPet) => likedPet.id !== pet.id);
      }
    });

    try {
      await setLikedPetsAsync((prevLikedPets) => prevLikedPets);
      await localforage.setItem('likedPets', likedPets);
    } catch (error) {
      console.error('Error storing liked pets:', error);
    }
  };

  return (
    <div className='my-pets-page-container'>
      {likedPets.length > 0 ? (
        <div className='pets-list'>
          {likedPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onLike={() => handleLikeToggle(pet)} />
          ))}
        </div>
      ) : (
        <div className='msg-if-no-pets'>
          You don't have any liked pets
        </div>
      )}
      <SearchButton />
    </div>
  );
}