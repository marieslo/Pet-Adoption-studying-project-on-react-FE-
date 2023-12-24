import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import fakePetsData from '../fakepetsdata/fakepetsdata.json';

const FetchPetsContext = createContext();

export const useFetchPets = () => {
  return useContext(FetchPetsContext);
};

export const useFetchPetsData = () => {
  return Promise.resolve(fakePetsData);
};

export const FetchPetsProvider = ({ children }) => {
  const [petsData, setPetsData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchPetsData = useCallback(async () => {
    try {
      setLoading(true);

      const startIdx = (page - 1) * limit;
      const endIdx = startIdx + limit;
      const newPetsData = fakePetsData.petsData.slice(startIdx, endIdx);

      setPetsData((prevData) => [...prevData, ...newPetsData]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(endIdx < fakePetsData.petsData.length);
    } catch (error) {
      console.error('Error fetching fake pet data:', error.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

useEffect(() => {
  console.log('useEffect is running');
  fetchPetsData();
}, []);

  const value = {
    petsData,
    loading,
    hasMore,
    fetchPetsData,
  };

  return (
    <FetchPetsContext.Provider value={value}>
      {children}
    </FetchPetsContext.Provider>
  );
};

const FetchDataButton = () => {
  const { fetchPetsData } = useFetchPets();

  const handleButtonClick = () => {
    fetchPetsData();
  };

  return <button onClick={handleButtonClick}>Fetch Data</button>;
};

export default FetchPetsProvider;
