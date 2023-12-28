import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useFetchPets } from '../../context/FetchPetsContext';
import './SearchBarOptions.css';

export default function Advanced({ onSearch }) {
  const [criteria, setCriteria] = useState({
    adoptionStatus: '',
    height: '',
    weight: '',
    type: '',
    name: '',
    breed: '',
  });

  const { advancedSearch } = useFetchPets();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  };

  const handleSearch = async () => {
    const isEmptyCriteria = Object.values(criteria).some((value) => value.trim() === '');

    if (!isEmptyCriteria) {
      const stringifiedCriteria = Object.fromEntries(
        Object.entries(criteria).map(([key, value]) => [key, value.toString()])
      );

      onSearch(await advancedSearch(stringifiedCriteria));
    } else {
      console.warn('Search criteria are empty. Please fill in at least one field.');
    }
  };

  return (
    <div className="advanced-search-container">
      <Form>
        <Form.Group className="mb-1"> 
          <Form.Label>Adoption Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Adoption Status"
            name="adoptionStatus"
            value={criteria.adoptionStatus}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-1"> 
          <Form.Label>Height</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Height"
            name="height"
            value={criteria.height}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-1"> 
          <Form.Label>Weight</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Weight"
            name="weight"
            value={criteria.weight}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-1"> 
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Type"
            name="type"
            value={criteria.type}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            value={criteria.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-1">
          <Form.Label>Breed</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Breed"
            name="breed"
            value={criteria.breed}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
    </div>
  );
}