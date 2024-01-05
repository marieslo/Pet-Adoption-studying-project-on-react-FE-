import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './SinglePetPage.css';
import localforage from 'localforage';
import { useFetchPets } from '../../context/FetchPetsContext';
import { useMyPetsContext } from '../../context/MyPetsProvider';
import { useAuth } from '../../context/AuthProvider';


export default function SinglePetPage() {
  const { id } = useParams();
  const { fetchPetDataById, petsData, loading } = useFetchPets();
  const {
    setAdoptedPetsAsync,
    setFosteredPetsAsync,
    adoptedPets,
    fosteredPets,
    setAdoptedPets,
    setFosteredPets,
  } = useMyPetsContext();

  const { user } = useAuth();

  const [currentAction, setCurrentAction] = useState(null);
  const [returnButtonClicked, setReturnButtonClicked] = useState(false);
  const isAdopted = adoptedPets.some((adoptedPet) => adoptedPet.id === id);
  const isFostered = fosteredPets.some((fosteredPet) => fosteredPet.id === id);
  const isOwner = petsData[0]?.owner === user?.id;

  useEffect(() => {
    fetchPetDataById(id);
  }, [fetchPetDataById, id]);

  const handleAdoptClick = async () => {
    try {
      if (!isAdopted && !isFostered && !currentAction && petsData[0]?.adoptionStatus === 'adoptable') {
        const adoptedPet = petsData[0];
        await setAdoptedPetsAsync(adoptedPet);
        updateAdoptionStatus('adopted');
      }
    } catch (error) {
      console.error('Error storing adopted pets:', error);
    }
  };

  const handleFosterClick = async () => {
    try {
      if (!isFostered && !currentAction && petsData[0]?.adoptionStatus === 'adoptable') {
        const fosteredPet = petsData[0];
        await setFosteredPetsAsync(fosteredPet);
        updateAdoptionStatus('fostered');
      }
    } catch (error) {
      console.error('Error storing fostered pets:', error);
    }
  };

  const handleReturnClick = async () => {
    try {
      if ((isAdopted || isFostered) && !returnButtonClicked) {
        setReturnButtonClicked(true);
  
        if (isAdopted) {
          setAdoptedPets((prevAdoptedPets) => prevAdoptedPets.filter((pet) => pet.id !== id));
        } else if (isFostered) {
          setFosteredPets((prevFosteredPets) => prevFosteredPets.filter((pet) => pet.id !== id));
        }
  
        await updateAdoptionStatus('adoptable');
        console.log('Adoption Status Updated');
      }
    } catch (error) {
      console.error('Error returning pet:', error);
    }
  };

  const updateAdoptionStatus = async (newStatus) => {
    try {
      const updatedPets = (await localforage.getItem('pets')) || [];
      const updatedPetIndex = updatedPets.findIndex((pet) => pet.id === id);

      if (updatedPetIndex !== -1) {
        updatedPets[updatedPetIndex].adoptionStatus = newStatus;
        await localforage.setItem('pets', updatedPets);
      }
    } catch (error) {
      console.error('Error updating adoption status in localforage:', error);
    }
  };

  if (loading) {
    return <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }

  if (!petsData || petsData.length === 0) {
    return <div>Pet not found</div>;
  }

  const {
    picture,
    name,
    type,
    adoptionStatus,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed,
  } = petsData[0];

  const isAuthenticated = !!user;

  return (
    <div className='single-pet-card-container'>
      <Card className='single-page-pet-card'>
        <Card.Body>
          <div className="custom-frame">
            <Card.Img
              variant="top"
              src={picture}
              alt={`Image of ${name}`}
              className="card-img"
            />
          </div>
          <Card.Title className='single-page-card-title'>{name}</Card.Title>
          <Card.Text>Bio: {bio}</Card.Text>
          <Card.Text>Type: {type}</Card.Text>
          <Card.Text>Status: {isAdopted ? 'adopted' : (isFostered ? 'fostered' : adoptionStatus)}</Card.Text>
          <Card.Text>Height: {height}</Card.Text>
          <Card.Text>Weight: {weight}</Card.Text>
          <Card.Text>Color: {color}</Card.Text>
          <Card.Text>Hypoallergenic: {hypoallergenic}</Card.Text>
          <Card.Text>Dietary Restrictions: {dietaryRestrictions}</Card.Text>
          <Card.Text>Breed: {breed}</Card.Text>

          {isAuthenticated && (
            <>
              {!isAdopted && !currentAction && (
                <>
                  {adoptionStatus === 'adoptable' && (
                    <Button
                      variant="secondary"
                      onClick={handleAdoptClick}
                    >
                      Adopt
                    </Button>
                  )}

                  {!isFostered && !currentAction && (
                    <>
                      {adoptionStatus === 'adoptable' && (
                        <Button
                          variant="secondary"
                          onClick={handleFosterClick}
                        >
                          Foster
                        </Button>
                      )}
                    </>
                  )}
                </>
              )}

              {(isAdopted || isFostered) && !currentAction && (
                <Button
                  variant="secondary"
                  onClick={handleReturnClick}
                  disabled={returnButtonClicked}
                >
                  Return to Adoption Center
                </Button>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}