import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchButton.css'
export default function SearchButton() {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/search');
  };

  return (
      <button className="search-button" onClick={handleSearch}>
        Find a pet
      </button>
  );
}