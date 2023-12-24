import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import SearchCategoryCard from '../SearchCategoryCard/SearchCategoryCard';
import './BasicSearch.css';

export default function BasicSearch({ onSearch }) {
  const [criteria, setCriteria] = useState({ type: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(criteria.type);
  };

  return (
    <div className="basic-search-container">
      <div className='search-bar'>
        <Form.Label>Type</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter type here or tap a card below"
          name="type" 
          value={criteria.type}
          onChange={handleInputChange}
        />
        <Button variant="danger" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div className='category-cards-container'>
        <SearchCategoryCard category="Dogs" onClick={() => onSearch({ type: 'dog' })} />
        <SearchCategoryCard category="Cats" onClick={() => onSearch({ type: 'cat' })} />
        <SearchCategoryCard
          category="Other Animals"
          onClick={() => onSearch({ type: 'other animals' })}
        />
      </div>
    </div>
  );
}