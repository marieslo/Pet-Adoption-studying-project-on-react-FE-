import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { useUserProfiles } from '../../context/UserProfilesContext';

export default function EditProfileForm({ onSave, initialData }) {
  const { updateUserProfile } = useUserProfiles();
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
    console.log('formData updated:', formData);
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log('Saving profile:', formData);

      const { email, id } = formData;

    updateUserProfile(id, formData);
    onSave(formData);

      const userLocalStorageKey = `userData_${email}`;
      const existingUserData = await localforage.getItem(userLocalStorageKey);
      const updatedUserData = { ...existingUserData, ...formData };
      await localforage.setItem(userLocalStorageKey, updatedUserData);

      setSuccessMessage('Your profile updated successfully');

      onSave(updatedUserData);
   } catch (error) {
    console.error('Error saving profile:', error);
    setSuccessMessage('Error updating your profile');
  }
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