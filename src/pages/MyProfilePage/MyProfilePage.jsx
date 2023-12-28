import React from 'react';
import EditProfileForm from './EditProfileForm';
import './MyProfilePage.css';
import { useAuth } from '../../context/AuthProvider.jsx';
import localforage from 'localforage';

export default function MyProfilePage() {
  const { user, login, updateUser } = useAuth();

  const handleSave = async (formData) => {
    try {
      console.log('Saving profile:', formData);

      const { email, id } = formData;

      updateUser(formData);
      const updatedUser = { ...user, ...formData };
      login(updatedUser);

      const userLocalStorageKey = `userData_${email}`;
      const existingUserData = await localforage.getItem(userLocalStorageKey);
      const updatedUserData = { ...existingUserData, ...formData };
      await localforage.setItem(userLocalStorageKey, updatedUserData);

      console.log('Save data:', formData);
    } catch (error) {
      console.error('Error saving profile:', error);

  };
}

  return (
    <div className='profile-page-container'>
      {user && <EditProfileForm userId={user.id} initialData={user} onSave={handleSave} />}
    </div>
  );
}