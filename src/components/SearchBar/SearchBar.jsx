import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch({ searchText, type: 'all' });
  };

  return (
    <Form className="search-bar">
      <Form.Group controlId="searchText">
        <Form.Control
          type="text"
          placeholder="Search be type..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Form.Group>

      <Button variant="warning" onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </Form>
  );
}