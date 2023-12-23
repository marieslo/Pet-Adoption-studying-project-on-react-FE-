import React from 'react';
import EditProfileForm from './EditProfileForm';
import './MyProfilePage.css';
import { useAuth } from '../../context/AuthProvider.jsx';
import localforage from 'localforage';

export default function MyProfilePage() {
  const { user, login } = useAuth();

  const handleSave = async (formData) => {
    const updatedUser = { ...user, ...formData };
    login(updatedUser);
    await localforage.setItem('user', updatedUser);
    console.log('Save data:', formData);
  };

  return (
    <div className='profile-page-container'>
      {user && <EditProfileForm initialData={user} onSave={handleSave} />}
    </div>
  );
}