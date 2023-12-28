import React, { createContext, useContext, useState, useCallback } from 'react';
import localforage from 'localforage';

const FetchPetsContext = createContext();

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

      if (searchTerm) {
        const filteredPets = storedPets.filter((pet) =>
          pet.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setPetsData(filteredPets);
        setError(null);
      } else {
        setPetsData(storedPets);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching pets data:', error.message);
      setPetsData([]);
      setError(`Error fetching pets data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const advancedSearch = useCallback(async (criteria) => {
    try {
      setLoading(true);
      const storedPets = await localforage.getItem('pets') || [];
  
      console.log('Search criteria:', criteria);
  
      const filteredPets = storedPets.filter((pet) => {
        return (
          pet.adoptionStatus.toLowerCase().includes(criteria?.adoptionStatus?.toLowerCase() || '') &&
          pet.height.toLowerCase().includes(criteria?.height?.toLowerCase() || '') &&
          pet.weight.toLowerCase().includes(criteria?.weight?.toLowerCase() || '') &&
          pet.type.toLowerCase().includes(criteria?.type?.toLowerCase() || '') &&
          pet.name.toLowerCase().includes(criteria?.name?.toLowerCase() || '') &&
          pet.breed.toLowerCase().includes(criteria?.breed?.toLowerCase() || '')
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
    loading,
    error,
    fetchPetDataById,
    fetchPetsData,
    advancedSearch,
  };

  return <FetchPetsContext.Provider value={value}>{children}</FetchPetsContext.Provider>;
}