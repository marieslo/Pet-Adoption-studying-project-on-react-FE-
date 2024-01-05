import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './SearchBar.css';
import searchIcon from '../../styles/icons/search.png';

export default function SearchBar({ onSearch }) {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState({
    type: '',
    adoptionStatus: '',
    height: '',
    weight: '',
    name: '',
    breed: '',
  });

  const handleSearch = () => {
    const isValidSearch = Object.values(searchTerm).some((value) => value !== '');
  
    if (isValidSearch) {
      onSearch(searchTerm);
    }
  };

  const handleToggleSearchMode = () => {
    if (isAdvancedSearch) {
      setSearchTerm({
        type: '',
        adoptionStatus: '',
        height: '',
        weight: '',
        name: '',
        breed: '',
      });
      onSearch({});
    }
    setIsAdvancedSearch((prev) => !prev);
  };

  return (
    <div className='searchbar-container'>
      <div className='toggle-search-container'>
        <Button
          className={`toggle-search-button ${isAdvancedSearch ? 'move-right' : 'move-left'}`}
          onClick={handleToggleSearchMode}
        >
          <span className='toggle-handle'>
            <span
              className='toggle-text'
              style={{
                fontWeight: 'bold',
                fontSize: '8px',
                color: '#A68D85',
                marginTop: '50%',
              }}
            >
              {isAdvancedSearch ? 'Switch to Basic' : 'Switch to Advanced'}
            </span>
          </span>
        </Button>
      </div>
      <div className='search-bar-btn-container'>
        <button className='search-bar-btn' onClick={handleSearch}>
          <img src={searchIcon} alt='Search Icon' className='search-icon' />
        </button>
      </div>
      <div className='searchbar-fields'>
        <input
          type='text'
          placeholder='Type'
          value={searchTerm.type}
          onChange={(e) => setSearchTerm({ ...searchTerm, type: e.target.value })}
        />
        {isAdvancedSearch && (
          <div className='advanced-search-fields'>
            <input
              type="text"
              placeholder="Adoption Status"
              value={searchTerm.adoptionStatus}
              onChange={(e) => setSearchTerm({ ...searchTerm, adoptionStatus: e.target.value })}
            />
            <input
              type="text"
              placeholder="Height"
              value={searchTerm.height}
              onChange={(e) => setSearchTerm({ ...searchTerm, height: e.target.value })}
            />
            <input
              type="text"
              placeholder="Weight"
              value={searchTerm.weight}
              onChange={(e) => setSearchTerm({ ...searchTerm, weight: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name"
              value={searchTerm.name}
              onChange={(e) => setSearchTerm({ ...searchTerm, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Breed"
              value={searchTerm.breed}
              onChange={(e) => setSearchTerm({ ...searchTerm, breed: e.target.value })}
            />
          </div>
        )}
      </div>
    </div>
  );
}