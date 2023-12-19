import React, { useState } from 'react';

export default function AdvancedSearch({ onSearch }) {
  const [criteria, setCriteria] = useState({});

  const handleSearch = () => {
    onSearch(criteria);
  };

  return (
    <div className="advanced-search-container">
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}