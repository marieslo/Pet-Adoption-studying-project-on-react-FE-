import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import localforage from 'localforage';
import { nanoid } from 'nanoid';
import { Button } from 'react-bootstrap';
import './AdminDashboards.css';

export default function AddPetForm() {
  const { isAdmin } = useAuth();

  const initialPetDetails = {
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
  };

  const [petDetails, setPetDetails] = useState(initialPetDetails);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [addedPetId, setAddedPetId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(petDetails).some((value) => value === '' || value === undefined)) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (isAdmin()) {
      try {
        const newPet = {
          id: nanoid(),
          ...petDetails,
        };

        const existingPets = await localforage.getItem('pets') || [];
        const updatedPets = [...existingPets, newPet];
        await localforage.setItem('pets', updatedPets);

        console.log('Pet added:', newPet);

        setAddedPetId(newPet.id);
        setShowSuccessMessage(true);
        setErrorMessage('');

        setPetDetails(initialPetDetails);

      } catch (error) {
        console.error('Error adding pet:', error);
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
    setAddedPetId(null);
  };

  const handleSuccessClose = () => {
    setShowSuccessMessage(false);
    setAddedPetId(null);
  };

  return (
    <div className='admin-dashboard-container'>
      <div className="add-pet-form-container">
        <h2>Pet's Details:</h2>
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
                  value="adopted"
                  checked={petDetails.adoptionStatus === "adopted"}
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
              <br/>
              <br/>
              <div className="add-pet-form-footer">
                <Button className='add-pet-button' variant='success' type="submit">
                  Save
                </Button>
                {showSuccessMessage && (
                  <div className="≈">
                    Pet added successfully! ID: {addedPetId}
                    <Button  onClick={handleSuccessClose}>
                     x
                    </Button>
                  </div>
                )}
                {errorMessage && (
                  <div className="error-message">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}