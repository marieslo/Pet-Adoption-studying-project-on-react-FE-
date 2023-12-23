import React from 'react';
import './SearchPage.css';
import SearchFeed from '../../components/SearchFeed/SearchFeed';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function SearchPage() {
  const handleSearch = (searchParams) => {
    console.log('Search initiated with:', searchParams);
  };

  return (
    <div className="search-page-container">
      <div className='searchbar-container'>
      <SearchBar inline={true} />
      </div>
      <div className='search-page-searchfeed-container'>
        <SearchFeed onSearch={handleSearch} />
      </div>
    </div>
  );
}