import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import localforage from 'localforage';
import './AdminDashboards.css';

export default function UsersDashboard() {
  const [users, setUsers] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserRole, setSelectedUserRole] = useState('user');

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

  const handleConfirmDelete = async () => {
    try {
      await localforage.removeItem(`userPets_${selectedUser.id}`);
      const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
      await localforage.setItem('registeredUsers', updatedUsers);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
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

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className='admin-dashboard-container'>
      <h2>Users</h2>
      <Table striped bordered hover>
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
              <td>
                <Button variant="warning" className='admin-dashboard-btn' onClick={() => handleUserClick(user)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showConfirmationModal} onHide={handleCloseModal}>
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
          <Button variant="success" className='admin-dashboard-btn' onClick={handleSaveRole}>
            Save Role
          </Button>
          <Button variant="danger" className='admin-dashboard-btn' onClick={handleConfirmDelete}>
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
