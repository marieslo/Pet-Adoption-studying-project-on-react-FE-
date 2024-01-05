import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import localforage from 'localforage';
import './AdminDashboards.css';


const itemsPerPage = 5;

export default function PetsDashboard() {
  const [petsData, setPetsData] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adoptedCount, setAdoptedCount] = useState(0);
  const [fosteredCount, setFosteredCount] = useState(0);
  const [adoptableCount, setAdoptableCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate(); 

  const handleAddNewPet = () => {
    navigate('/addpet'); 
  };
  useEffect(() => {
    const fetchPetsData = async () => {
      try {
        const storedPetsData = await localforage.getItem('pets') || [];
        setPetsData(storedPetsData);
  
        const adopted = storedPetsData.filter((pet) => pet.adoptionStatus === 'adopted');
        const fostered = storedPetsData.filter((pet) => pet.adoptionStatus === 'fostered');
        const adoptable = storedPetsData.filter((pet) => pet.adoptionStatus === 'adoptable');
  
        setAdoptedCount(adopted.length);
        setFosteredCount(fostered.length);
        setAdoptableCount(adoptable.length);
      } catch (error) {
        console.error('Error fetching pets data:', error);
      }
    };
  
    fetchPetsData();
  }, []);
  

  const handleDeleteClick = (pet) => {
    setSelectedPet(pet);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const updatedPetsData = petsData.filter((pet) => pet.id !== selectedPet.id);
    localforage.setItem('pets', updatedPetsData).then(() => {
      setPetsData(updatedPetsData);
      setSelectedPet(null);
      setShowDeleteModal(false);
    });
  };

  const handleDeleteCancel = () => {
    setSelectedPet(null);
    setShowDeleteModal(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = petsData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='admin-dashboard-container'>
      <div className="dashboard-header">
        <h2 className='admin-dashboard-name'>Pets</h2>
      </div>
      <div className="status-counts">
          <span className='dashboard-counter'>Adopted: {adoptedCount}</span>
          <span className='dashboard-counter'>Fostered: {fosteredCount}</span>
          <span className='dashboard-counter'>Adoptable: {adoptableCount}</span>
          <Button onClick={handleAddNewPet} className='add-new-pet-btn' variant="secondary">
          Add New Pet
        </Button>
    
      <div className="pagination-container"> Page:
      {Array.from({ length: Math.ceil(petsData.length / itemsPerPage) }).map((_, index) => (
        <Button
        className='pagination-btn'
          key={index}
          onClick={() => paginate(index + 1)}
          variant={currentPage === index + 1 ? "light" : "secondary"}
        >
          {index + 1}
        </Button>
      ))}
    </div>
    </div>
      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th>Pet's id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Adoption Status</th>
            <th>Picture</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Color</th>
            <th>Bio</th>
            <th>Hypoallergenic</th>
            <th>Dietary Restrictions</th>
            <th>Breed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {currentItems.map((pet) => (
              <tr key={pet.id}>
                <td>{pet.id}</td>
                <td className="w-max-content">{pet.name}</td>
                <td className="w-max-content">{pet.type}</td>
                <td className="w-max-content">{pet.adoptionStatus}</td>
                <td>
                  <img src={pet.picture} alt={pet.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </td>
                <td>{pet.height}</td>
                <td>{pet.weight}</td>
                <td>{pet.color}</td>
                <td>{pet.bio}</td>
                <td>{pet.hypoallergenic}</td>
                <td>{pet.dietaryRestrictions}</td>
                <td>{pet.breed}</td>
                <td>
                  <div className='pet-dashboard-btns'>
                    <Link to={`/addpet/${pet.id}`}>
                      <Button className='admin-dashboard-btn' variant="secondary">
                        View/Edit
                      </Button>
                    </Link>
                    <Button
                      className='admin-dashboard-btn'
                      variant="secondary"
                      onClick={() => handleDeleteClick(pet)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

 
      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedPet && selectedPet.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}