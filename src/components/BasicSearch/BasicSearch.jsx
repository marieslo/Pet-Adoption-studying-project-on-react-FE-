import React from 'react';

export default function BasicSearch({ onSearch }) {
  const handleSearch = () => {
    onSearch({ type: 'all' });
  };

  return (
    <div className="basic-search-container">
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}