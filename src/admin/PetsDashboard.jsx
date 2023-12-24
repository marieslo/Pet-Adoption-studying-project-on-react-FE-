import React, { useState } from 'react';
import './AdminDashboards.css';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fakePetsData from '../fakepetsdata/fakepetsdata.json';
import './AdminDashboards.css';

export default function PetsDashboard() {
  const [filters, setFilters] = useState({
    name: '',
    type: '',
    status: '',
  });

  const handleFilterChange = (columnName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnName]: value,
    }));
  };

  const filteredPets = fakePetsData.petsData.filter((pet) => {
    return (
      pet.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      pet.type.toLowerCase().includes(filters.type.toLowerCase()) &&
      pet.status.toLowerCase().includes(filters.status.toLowerCase())
    );
  });

  return (
    <div className='admin-dashboard-container'>
      <div className="dashboard-header">
        <h2>Pets</h2>
        <Link to="/addpet">
          <Button className='admin-dashboard-btn' variant="success">
            Add New Pet
          </Button>
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              ID
            </th>
            <th>
              <input
                type="text"
                placeholder="Filter by Name"
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Filter by Type"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Filter by Status"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPets.map((pet) => (
            <tr key={pet.id}>
              <td>{pet.id}</td>
              <td>{pet.name}</td>
              <td>{pet.type}</td>
              <td>{pet.status}</td>
              <td>
                <Link to={`/pets/${pet.id}`}>
                  <Button className='admin-dashboard-btn' variant="info">
                    View/Edit
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
