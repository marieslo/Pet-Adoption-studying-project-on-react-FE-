import React from 'react';
import './SearchPage.css';
import SearchBarMode from '../../components/SearchBarMode/SearchBarMode';

export default function SearchPage() {
  const handleSearch = (searchResults) => {
    console.log('Search results:', searchResults);
  };

  return (
    <div className="search-page-container">
      {/* <div className='search-options-and-results-layout'> */}
        <SearchBarMode onSearch={handleSearch} />
        {/* </div> */}
    </div>
  );
}