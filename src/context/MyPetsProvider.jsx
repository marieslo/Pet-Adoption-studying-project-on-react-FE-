import React, { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';
import { useAuth } from './AuthProvider';

const MyPetsContext = createContext();

export default function MyPetsProvider({ children }) {
  const { user } = useAuth();

  const likedPetsKey = `likedPets_${user?.id}`;
  const adoptedPetsKey = `adoptedPets_${user?.id}`;
  const fosteredPetsKey = `fosteredPets_${user?.id}`;

  const [likedPets, setLikedPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [fosteredPets, setFosteredPets] = useState([]);

  const [userPets, setUserPets] = useState([]);

  const setLikedPetsAsync = async (pet) => {
    try {
      setLikedPets(pet);
      await localforage.setItem(likedPetsKey, pet);
    } catch (error) {
      console.error('Error storing liked pets:', error);
    }
  };
  
  const setAdoptedPetsAsync = async (pet) => {
    try {
      await localforage.setItem(adoptedPetsKey, (prevAdoptedPets) => [...prevAdoptedPets, pet]);
      setAdoptedPets((prevAdoptedPets) => [...prevAdoptedPets, pet]);
    } catch (error) {
      console.error('Error storing adopted pets:', error);
    }
  };
  
  const setFosteredPetsAsync = async (pet) => {
    try {
      await localforage.setItem(fosteredPetsKey, (prevFosteredPets) => [...prevFosteredPets, pet]);
      setFosteredPets((prevFosteredPets) => [...prevFosteredPets, pet]);
    } catch (error) {
      console.error('Error storing fostered pets:', error);
    }
  };

  const getPetById = async (id) => {
    try {
      const storedPets = (await localforage.getItem('pets')) || [];
      const pet = storedPets.find((storedPet) => storedPet.id === id);
      return pet || null;
    } catch (error) {
      console.error('Error fetching pet by ID:', error);
      return null;
    }
  };

  const handleLikeClick = async (pet) => {
    try {
      const newLikeStatus = !isLiked(pet);
      const updatedLikedPets = newLikeStatus
        ? [...likedPets, { ...pet }]
        : likedPets.filter((likedPet) => likedPet.id !== pet.id);

      await setLikedPetsAsync(updatedLikedPets);
    } catch (error) {
      console.error('Error updating liked status:', error);
    }
  };

  const isLiked = (pet) => likedPets.some((likedPet) => likedPet.id === pet.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedLikedPets = (await localforage.getItem(likedPetsKey)) || [];
        const storedAdoptedPets = (await localforage.getItem(adoptedPetsKey)) || [];
        const storedFosteredPets = (await localforage.getItem(fosteredPetsKey)) || [];
        setLikedPets(storedLikedPets);
        setAdoptedPets(storedAdoptedPets);
        setFosteredPets(storedFosteredPets);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchData();
  }, [likedPetsKey, adoptedPetsKey, fosteredPetsKey]);

  return (
    <MyPetsContext.Provider
      value={{
        likedPets,
        setLikedPets,
        setLikedPetsAsync,
        adoptedPets,
        setAdoptedPets,
        setAdoptedPetsAsync,
        fosteredPets,
        setFosteredPets,
        setFosteredPetsAsync,
        getPetById,
        handleLikeClick,
        isLiked,
        userPets,
        setUserPets,
      }}
    >
      {children}
    </MyPetsContext.Provider>
  );
}

export const useMyPetsContext = () => {
  const context = useContext(MyPetsContext);
  if (!context) {
    throw new Error('useMyPetsContext must be used within a MyPetsProvider');
  }
  return context;
};