import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import BasicSearch from '../BasicSearch/BasicSearch';
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState('basic');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    await onSearch({ term: searchTerm, mode: searchMode });
    setLoading(false);
  };

  const toggleSearchMode = () => {
    setSearchMode((prevMode) => (prevMode === 'basic' ? 'advanced' : 'basic'));
  };

  return (
    <div className='search-options-container'>
      <div className='toggle-search-container'>
        <Button className='toggle-search-button' onClick={toggleSearchMode}>
          <span className={`toggle-handle ${searchMode === 'basic' ? 'move-left' : 'move-right'}`}></span>
        </Button>
        {searchMode === 'basic' ? 'Switch to Advanced Search' : 'Switch to Basic Search'}
      </div>
      <Form inline={true} className="mr-auto">
      </Form>
      {searchMode === 'basic' ? (
        <BasicSearch onSearch={handleSearch} />
      ) : (
        <AdvancedSearch onSearch={handleSearch} />
      )}
      {loading && <Spinner animation="border" className="loading-spinner" />}
    </div>
  );
}
