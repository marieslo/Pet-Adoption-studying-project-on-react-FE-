import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import localforage from 'localforage';
import './AdminDashboards.css';
import PetsOwners from './PetsOwners';
import { useMyPetsContext } from '../context/MyPetsProvider';
import { useUserProfiles } from '../context/UserProfilesContext';

export default function UsersDashboard() {
  const { userProfiles } = useUserProfiles();
  const [users, setUsers] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDeleteWarningModal, setShowDeleteWarningModal] = useState(false);
  const [showUserPetsModal, setShowUserPetsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserRole, setSelectedUserRole] = useState('user');
  
  const { adoptedPets, fosteredPets } = useMyPetsContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUsers = await localforage.getItem('registeredUsers') || [];
        setUsers(storedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setSelectedUserRole(user.role || 'user');
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteWarningModal(true);
  };

  const handleUserPetsClick = (user) => {
    setSelectedUser(user);
    setShowUserPetsModal(true);
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
      await localforage.setItem('registeredUsers', updatedUsers);
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

    localforage.setItem('registeredUsers', updatedUsers);
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
        <h2>Users</h2>
        <span className='dashboard-counter'>Total Users: {users.length}</span>
      </div>
      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
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
                <Button variant="secondary" className='admin-dashboard-btn mr-2' onClick={() => handleUserClick(user)}>
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
      <Modal show={showUserPetsModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>User Pets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <PetsOwners
              userId={selectedUser.id}
              adoptedPets={adoptedPets}
              fosteredPets={fosteredPets}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}