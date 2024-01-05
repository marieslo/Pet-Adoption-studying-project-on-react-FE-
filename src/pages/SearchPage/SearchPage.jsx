import React from 'react';
import { Spinner } from 'react-bootstrap';
import './SearchPage.css'
import { useFetchPets } from '../../context/FetchPetsContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';


export default function SearchPage() {
  const { petsData, loading, error, fetchPetsData } = useFetchPets();

  const handleSearch = (searchTerm) => {
    fetchPetsData(searchTerm);
  };

  return (
    <div className='search-page-container'>
      <div className='searchbar-and-searchresults-wrapper'>
        <div className='search-container'>
          <SearchBar onSearch={handleSearch} />
          <div className='spinner-container'>
            {loading && <Spinner animation="grow" role="status" />}
          </div>
          <div className='searchresults-wrapper'>
            <div className='search-results'>
              {loading && <Spinner animation="grow" role="status" />}
              {error && <p>Error: {error}</p>}
              <SearchResults petsData={petsData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}