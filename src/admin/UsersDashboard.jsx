import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import './AdminDashboards.css';
import localforage from 'localforage';
import MyPetsModalContent from './MyPetsModalContent';
import { useMyPetsContext } from '../context/MyPetsProvider';

const itemsPerPage = 10;

export default function UsersDashboard() {
  const [users, setUsers] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDeleteWarningModal, setShowDeleteWarningModal] = useState(false);
  const [showUserPetsModal, setShowUserPetsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserRole, setSelectedUserRole] = useState('user');
  const [currentPage, setCurrentPage] = useState(1);

  const {fosteredPets, adoptedPets, likedPets, setUserPets } = useMyPetsContext(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsers = await localforage.getItem('users') || [];
        setUsers(storedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleUserPetsClick = async (user) => {
    setSelectedUser(user);
    setShowUserPetsModal(true);

    try {
      const userPetsData = await localforage.getItem(`userPets_${user.id}`) || [];
      setUserPets(userPetsData); 
    } catch (error) {
      console.error('Error fetching user pets:', error);
    }
  };

  const getUserPets = () => {
    switch (selectedUserRole) {
      case 'fostered':
        return fosteredPets;
      case 'adopted':
        return adoptedPets;
      case 'liked':
        return likedPets;
      default:
        return [];
    }
  };

  const handleDeleteUserClick = (user) => {
    setSelectedUser(user);
    setShowDeleteWarningModal(true);
  };

  const handleDeleteUser = async () => {
    try {
      if (!selectedUser || !selectedUser.id) {
        console.error('Invalid user or user ID');
        return;
      }
      await localforage.removeItem(`userPets_${selectedUser.id}`);
      const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
      await localforage.setItem('users', updatedUsers);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setShowDeleteWarningModal(false);
      setShowConfirmationModal(false);
    }
  };

  const handleRoleChange = (event) => {
    setSelectedUserRole(event.target.value);
  };

  const handleSaveRole = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return { ...user, role: selectedUserRole };
      }
      return user;
    });

    localforage.setItem('users', updatedUsers);
    setUsers(updatedUsers);
    setShowConfirmationModal(false);
  };

  const handleCloseModals = () => {
    setShowConfirmationModal(false);
    setShowDeleteWarningModal(false);
    setShowUserPetsModal(false);
  };

  return (
    <div className='admin-dashboard-container'>
      <div className="dashboard-header">
        <h2 className='admin-dashboard-name'>Users</h2>
      </div>
      <div className="status-counts">
        <span className='dashboard-counter'>Total Accounts: {users.length}</span>
        <div className="pagination-container">Page:
          {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map((_, index) => (
            <Button
              className='pagination-btn'
              key={index}
              onClick={() => setCurrentPage(index + 1)}
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
            <th>User's id</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Short Bio</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.shortBio}</td>
              <td>{user.role || 'user'}</td>
              <td className="d-flex">
                <Button variant="secondary" className='admin-dashboard-btn mr-2' onClick={() => setShowConfirmationModal(true)}>
                  Change role
                </Button>
                <Button variant="secondary" className='admin-dashboard-btn mr-2' onClick={() => handleUserPetsClick(user)}>
                  View Pets
                </Button>
                <Button variant="secondary" className='admin-dashboard-btn' onClick={() => handleDeleteUserClick(user)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showConfirmationModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="roleSelect">
            <Form.Label>Change Role:</Form.Label>
            <Form.Control as="select" value={selectedUserRole} onChange={handleRoleChange}>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='admin-dashboard-btn' onClick={handleSaveRole}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteWarningModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedUser && selectedUser.email}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUserPetsModal} onHide={() => setShowUserPetsModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{`Pets of ${selectedUser && selectedUser.email}`} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MyPetsModalContent pets={getUserPets()} cssClass="user-pets" />
          </Modal.Body>
        </Modal>
    </div>
  );
}