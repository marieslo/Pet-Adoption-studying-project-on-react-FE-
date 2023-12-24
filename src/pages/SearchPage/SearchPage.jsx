import React from 'react';
import './SearchPage.css';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function SearchPage() {

  return (
    <div className="search-page-container">
      <div className='searchbar-container'>
      <SearchBar inline={true} />
      </div>
  
    </div>
  );
}