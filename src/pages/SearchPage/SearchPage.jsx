import React, { useState, useEffect } from 'react';
import SearchFeed from '../../components/SearchFeed/SearchFeed';
import SearchBar from '../../components/SearchBar/SearchBar';


export default function SearchPage() {

  const handleSearch = (searchCriteria) => {
    console.log('Search criteria:', searchCriteria);
  };

  return (
    <div className="search-page-container">
      <SearchBar onSearch={handleSearch} />
      <SearchFeed/>
    </div>
  );
}