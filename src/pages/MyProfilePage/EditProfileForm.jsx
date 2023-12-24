import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { useAuth } from '../../context/AuthProvider.jsx';

export default function EditProfileForm({ onSave, initialData }) {
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    shortBio: '',
    ...initialData,
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSave = async () => {
    await onSave(formData);
    setSuccessMessage('Your profile updated successfully');
    console.log('Success message set:', successMessage);


    updateUser(formData);
  };

  return (
    <>
  <div className='success-edit-profile-msg'>
        {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    <div className='edit-profile-container'>
      <h2>Edit Profile</h2>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Short Bio:</label>
          <textarea
            name="shortBio"
            value={formData.shortBio}
            onChange={handleChange}
          />
        </div>
        <button className="edit-profile-page-btn" type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
    </>
  );
}