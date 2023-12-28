import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import './SearchBarMode.css';
import BasicSearch from '../SearchBarOptions/BasicSearch';
import AdvancedSearch from '../SearchBarOptions/AdvancedSearch';
import { useFetchPets } from '../../context/FetchPetsContext';
import PetCard from '../PetCard/PetCard';
import searchIcon from '../../styles/icons/search.png';

export default function SearchBarMode({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [advancedSearchCriteria, setAdvancedSearchCriteria] = useState({});
  const { fetchPetsData, advancedSearch, petsData } = useFetchPets();

  const handleSearch = async () => {
    setLoading(true);

    try {
      let searchData;

      if (searchMode === 'basic') {
        searchData = await fetchPetsData(searchTerm);
      } else {
        searchData = await advancedSearch(advancedSearchCriteria);
      }

      console.log('Pets data after search:', searchData);

      onSearch(searchData);

      setNoResults(false);
    } catch (error) {
      console.error('Error during search:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, advancedSearchCriteria]);


  const getToggleTextColor = () => {
    return searchMode === 'basic' ? '#8C4303' : '#8C4303';
  };

  return (
    <>
       <div className='search-options-container'>
        <div className='toggle-search-container'>
          <Button
            className={`toggle-search-button ${searchMode === 'basic' ? 'move-left' : 'move-right'}`}
            onClick={() => setSearchMode((prevMode) => (prevMode === 'basic' ? 'advanced' : 'basic'))}
          >
           
            <span className='toggle-handle'></span>
            <span className='toggle-text'
              style={{
                fontWeight: 'bold',
                fontSize: '10px',
                color: getToggleTextColor(),
                marginLeft: '5px',
              }}
            >
              {searchMode === 'basic' ? 'to Advanced' : 'to Basic'}
            </span>
          </Button>
        </div>
      <Form inline={true.toString()} className="mr-auto">
      <Button className='search-bar-btn' variant="danger" onClick={handleSearch}>
          <img src={searchIcon} alt="Search icon" className="search-icon" />
        </Button>
        <Form.Label className="mb-1 mt-1">Type</Form.Label>
        <Form.Control 
          type="text"
          placeholder="Enter type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>
      
      </div>
      <div className='search-mode-choice-container'>
      {searchMode === 'basic' ? <BasicSearch onSearch={handleSearch} /> : <AdvancedSearch onSearch={handleSearch} />}
      {loading && <Spinner animation="grow" variant="warning" />}
      </div>
      {petsData && petsData.length > 0 ? (
        <div className='search-results-container'>
          <h5>Results:</h5>
         
        </div>
      ) : (
        <div className="no-results-message">No results found</div>
      )}
     
</>
  );
}