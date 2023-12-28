import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import localforage from 'localforage';
import { Button } from 'react-bootstrap';
import './AdminDashboards.css';

export default function EditPetForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAdmin } = useAuth();

  const [petDetails, setPetDetails] = useState({
    type: '',
    name: '',
    adoptionStatus: '',
    picture: '',
    height: '',
    weight: '',
    color: '',
    bio: '',
    hypoallergenic: '',
    dietaryRestrictions: '',
    breed: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(petDetails).some((value) => value === '' || value === undefined)) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (isAdmin()) {
      try {
        const existingPets = await localforage.getItem('pets') || [];
        const updatedPets = existingPets.map((pet) => (pet.id === id ? { ...pet, ...petDetails } : pet));

        await localforage.setItem('pets', updatedPets);

        console.log('Pet updated:', updatedPets.find((pet) => pet.id === id));

        setShowSuccessMessage(true);
        setErrorMessage('');

      } catch (error) {
        console.error('Error updating pet:', error);
      }
    } else {
      setErrorMessage('Sorry, you do not have admin privileges.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    setShowSuccessMessage(false);
  };

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const storedPetsData = await localforage.getItem('pets') || [];
        const selectedPet = storedPetsData.find((pet) => pet.id === id);

        if (selectedPet) {
          setPetDetails(selectedPet);
        }
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };

    fetchPetDetails();
  }, [id]);

  return (
    <div className='admin-dashboard-container'>
      <div className="add-pet-form-container">
        <h2>Edit Pet Details:</h2>
        <br/>
        <form onSubmit={handleSubmit} className="add-pet-form">
          <div className="add-pet-form-column">
            <div className="add-pet-form-column-item">
            <label className='left-label'>
                Type: * 
                <br/>
                <br/>
                <input
                  className='radio-choice'
                  type="radio"
                  name="type"
                  value="dog"
                  checked={petDetails.type === "dog"}
                  onChange={handleChange}
                  required
                />
                Dog
                <input
                  className='radio-choice'
                  type="radio"
                  name="type"
                  value="cat"
                  checked={petDetails.type === "cat"}
                  onChange={handleChange}
                  required
                />
                Cat
                <input
                  className='radio-choice'
                  type="radio"
                  name="type"
                  value="other"
                  checked={petDetails.type === "other"}
                  onChange={handleChange}
                  required
                />
                Other
              </label>
            </div>
            <br/>
            <div className="add-pet-form-column-item">
              <label className="left-label">
                Name: *
                <br/>
                <input type="text" name="name" value={petDetails.name} onChange={handleChange} required />
              </label>
              <br/>
              <label className="left-label">
                Adoption Status: *
                <br/>
                <br/>
                <input
                  className='radio-choice'
                  type="radio"
                  name="adoptionStatus"
                  value="adoptable"
                  checked={petDetails.adoptionStatus === "adoptable"}
                  onChange={handleChange}
                  required
                />
                Adoptable
                <input
                  className='radio-choice'
                  type="radio"
                  name="adoptionStatus"
                  value="adopted"
                  checked={petDetails.adoptionStatus === "adopted"}
                  onChange={handleChange}
                  required
                />
                Adopted
                <input
                  className='radio-choice'
                  type="radio"
                  name="adoptionStatus"
                  value="fostered"
                  checked={petDetails.adoptionStatus === "fostered"}
                  onChange={handleChange}
                  required
                />
                Fostered
              </label>
              <br/>
              <label className="left-label">
                Picture URL: *
                <br/>
                <input type="text" name="picture" value={petDetails.picture} onChange={handleChange} required />
              </label>
              <label className="left-label">
                Height: *
                <br/>
                <input type="text" name="height" value={petDetails.height} onChange={handleChange} required />
              </label>
              <label className="left-label">
                Weight: *
                <br/>
                <input type="text" name="weight" value={petDetails.weight} onChange={handleChange} required />
              </label>
              <label className="left-label">
                Color: *
                <br/>
                <input type="text" name="color" value={petDetails.color} onChange={handleChange} required />
              </label>
            </div>
          </div>
          <div className="add-pet-form-column">
            <div className="add-pet-form-column-item">
              <label className="left-label">
                Bio: *
                <br/>
                <textarea name="bio" value={petDetails.bio} onChange={handleChange} required />
              </label>
            </div>
            <div className="add-pet-form-column-item">
              <div className="choice-container">
                <label className="left-label">
                  Hypoallergenic: *
                  <br/>
                  <br/>
                  <input
                    className='radio-choice'
                    type="radio"
                    name="hypoallergenic"
                    value="yes"
                    checked={petDetails.hypoallergenic === "yes"}
                    onChange={handleChange}
                    required
                  />
                  Yes
                  <input
                    className='radio-choice'
                    type="radio"
                    name="hypoallergenic"
                    value="no"
                    checked={petDetails.hypoallergenic === "no"}
                    onChange={handleChange}
                    required
                  />
                  No
                </label>
              </div>
              <label className="left-label">
                Dietary Restrictions: *
                <br/>
                <input type="text" name="dietaryRestrictions" value={petDetails.dietaryRestrictions} onChange={handleChange} required />
              </label>
              <label className="left-label">
                Breed: *
                <br/>
                <input type="text" name="breed" value={petDetails.breed} onChange={handleChange} required />
              </label>
              </div>
          </div>
          <div className="add-pet-form-footer">
            <Button className='add-pet-button' variant='secondary' type="submit">
              Save Changes
            </Button>
            {showSuccessMessage && (
              <div className="success-message">
                Pet updated successfully!
              </div>
            )}
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}