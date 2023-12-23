import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function AdvancedSearch({ onSearch }) {
  const [criteria, setCriteria] = useState({
    adoptionStatus: '',
    height: '',
    weight: '',
    type: '',
    name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(criteria);
  };

  return (
    <div className="advanced-search-container">
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Label>Adoption Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Adoption Status"
              name="adoptionStatus"
              value={criteria.adoptionStatus}
              onChange={handleInputChange}
            />
          </Col>
          <Col>
            <Form.Label>Height</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Height"
              name="height"
              value={criteria.height}
              onChange={handleInputChange}
            />
          </Col>
          <Col>
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Weight"
              name="weight"
              value={criteria.weight}
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Type"
              name="type"
              value={criteria.type}
              onChange={handleInputChange}
            />
          </Col>
          <Col>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              value={criteria.name}
              onChange={handleInputChange}
            />
          </Col>
        <Col>
            <Form.Label>Breed</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Breed"
              name="name"
              value={criteria.breed}
              onChange={handleInputChange}
            />
          </Col>
          </Row>
        <Button variant="danger" onClick={handleSearch}>
          Search
        </Button>
      </Form>
    </div>
  );
}