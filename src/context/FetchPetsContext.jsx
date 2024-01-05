import React, { createContext, useContext, useState, useCallback } from 'react';
import localforage from 'localforage';

export const FetchPetsContext = createContext();

export const useFetchPets = () => {
  return useContext(FetchPetsContext);
};

export default function FetchPetsProvider({ children }) {
  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPetDataById = useCallback(async (id) => {
    try {
      setLoading(true);
      const storedPets = await localforage.getItem('pets') || [];
      const data = storedPets.find((pet) => pet.id === id);

      if (data) {
        setPetsData([data]);
        setError(null);
      } else {
        setPetsData([]);
        setError(`Data not found for id: ${id}`);
      }
    } catch (error) {
      console.error('Error fetching pet data:', error.message);
      setPetsData([]);
      setError(`Error fetching pet data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPetsData = useCallback(async (searchTerm) => {
    try {
      setLoading(true);
      const storedPets = await localforage.getItem('pets') || [];
  
      let filteredPets = storedPets;
  
      if (searchTerm && typeof searchTerm === 'string') {
        filteredPets = filteredPets.filter((pet) =>
          pet.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      if (searchTerm?.adoptionStatus) {
        filteredPets = filteredPets.filter((pet) =>
          pet.adoptionStatus.toLowerCase().includes(searchTerm.adoptionStatus.toLowerCase())
        );
      }
  
      if (searchTerm?.height) {
        filteredPets = filteredPets.filter((pet) =>
          pet.height.toLowerCase().includes(searchTerm.height.toLowerCase())
        );
      }
  
      if (searchTerm?.weight) {
        filteredPets = filteredPets.filter((pet) =>
          pet.weight.toLowerCase().includes(searchTerm.weight.toLowerCase())
        );
      }
  
      if (searchTerm?.type) {
        filteredPets = filteredPets.filter((pet) =>
          pet.type.toLowerCase().includes(searchTerm.type.toLowerCase())
        );
      }
  
      if (searchTerm?.name) {
        filteredPets = filteredPets.filter((pet) =>
          pet.name.toLowerCase().includes(searchTerm.name.toLowerCase())
        );
      }
  
      if (searchTerm?.breed) {
        filteredPets = filteredPets.filter((pet) =>
          pet.breed.toLowerCase().includes(searchTerm.breed.toLowerCase())
        );
      }
  
      setPetsData(filteredPets);
      setError(null);
    } catch (error) {
      console.error('Error fetching pets data:', error.message);
      setPetsData([]);
      setError(`Error fetching pets data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const advancedSearch = useCallback(async (searchTerm) => {
    try {
      setLoading(true);
      const storedPets = await localforage.getItem('pets') || [];

      console.log('Search term:', searchTerm);

      const filteredPets = storedPets.filter((pet) => {
        return (
          pet.adoptionStatus.toLowerCase().includes(searchTerm?.adoptionStatus?.toLowerCase() || '') &&
          pet.height.toLowerCase().includes(searchTerm?.height?.toLowerCase() || '') &&
          pet.weight.toLowerCase().includes(searchTerm?.weight?.toLowerCase() || '') &&
          pet.type.toLowerCase().includes(searchTerm?.type?.toLowerCase() || '') &&
          pet.name.toLowerCase().includes(searchTerm?.name?.toLowerCase() || '') &&
          pet.breed.toLowerCase().includes(searchTerm?.breed?.toLowerCase() || '')
        );
      });

      console.log('Filtered pets:', filteredPets);

      setPetsData(filteredPets);
      setError(null);
      return filteredPets;
    } catch (error) {
      console.error('Error during advanced search:', error.message);
      setPetsData([]);
      setError(`Error during advanced search: ${error.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    petsData,
    setPetsData,
    loading,
    error,
    fetchPetDataById,
    fetchPetsData,
    advancedSearch,
  };

  return <FetchPetsContext.Provider value={value}>{children}</FetchPetsContext.Provider>;
}