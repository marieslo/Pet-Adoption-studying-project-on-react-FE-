import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useFetchPets } from '../../context/FetchPetsContext';
import { useMyPetsContext } from '../../context/MyPetsProvider';
import './SinglePetPage.css';
import localforage from 'localforage';
import { useAuth } from '../../context/AuthProvider';

export default function SinglePetPage() {
  const { id } = useParams();
  const { fetchPetDataById, petsData, loading } = useFetchPets();
  const { setAdoptedPetsAsync, setFosteredPetsAsync, adoptedPets, fosteredPets } = useMyPetsContext();
  const { user } = useAuth();

  const isAdopted = adoptedPets.some((adoptedPet) => adoptedPet.id === id);
  const isFostered = fosteredPets.some((fosteredPet) => fosteredPet.id === id);

  useEffect(() => {
    fetchPetDataById(id);
  }, [fetchPetDataById, id]);

  const handleAdoptClick = async () => {
    try {
      if (!isAdopted && (petsData[0]?.adoptionStatus === 'adoptable' || petsData[0]?.adoptionStatus === 'fostered')) {
        await setAdoptedPetsAsync((prevAdoptedPets) => [...prevAdoptedPets, petsData[0]]);
        updateAdoptionStatus('adopted');
      }
    } catch (error) {
      console.error('Error storing adopted pets:', error);
    }
  };

  const handleFosterClick = async () => {
    try {
      if (!isFostered && petsData[0]?.adoptionStatus === 'adoptable') {
        await setFosteredPetsAsync((prevFosteredPets) => [...prevFosteredPets, petsData[0]]);
        updateAdoptionStatus('fostered');
      }
    } catch (error) {
      console.error('Error storing fostered pets:', error);
    }
  };

  const handleReturnClick = async () => {
    try {
      if (isAdopted) {
        await setAdoptedPetsAsync((prevAdoptedPets) =>
          prevAdoptedPets.filter((adoptedPet) => adoptedPet.id !== id)
        );
        updateAdoptionStatus('adoptable');
      } else if (isFostered) {
        await setFosteredPetsAsync((prevFosteredPets) =>
          prevFosteredPets.filter((fosteredPet) => fosteredPet.id !== id)
        );
        updateAdoptionStatus('adoptable');
      } else {
        console.log("You can't return a pet that you didn't adopt or foster.");
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
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
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
    isOwner,
  } = petsData[0];

  const isAdoptedByCurrentUser = isAdopted && adoptedPets.find((adoptedPet) => adoptedPet.id === id)?.owner === user.id;

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
          <Card.Text>Status: {isAdopted ? 'Adopted' : (isFostered ? 'Fostered' : adoptionStatus)}</Card.Text>
          <Card.Text>Height: {height}</Card.Text>
          <Card.Text>Weight: {weight}</Card.Text>
          <Card.Text>Color: {color}</Card.Text>
          <Card.Text>Hypoallergenic: {hypoallergenic}</Card.Text>
          <Card.Text>Dietary Restrictions: {dietaryRestrictions}</Card.Text>
          <Card.Text>Breed: {breed}</Card.Text>

          {(adoptionStatus === 'adoptable' || adoptionStatus === 'fostered') && (
            <>
              <Button
                variant="primary"
                onClick={handleAdoptClick}
                disabled={isAdopted || (adoptionStatus === 'adopted' && !isAdoptedByCurrentUser)}
              >
                Adopt
              </Button>
              {adoptionStatus === 'adoptable' && (
                <Button variant="success" onClick={handleFosterClick} disabled={isFostered}>
                  Foster
                </Button>
              )}
            </>
          )}
          {(adoptionStatus === 'adopted' && isAdopted && isAdoptedByCurrentUser) && (
  <>
          {isOwner ? (
            <Button variant="danger" onClick={handleReturnClick}>
              Return to Adoption Center
            </Button>
          ) : (
            <Button variant="danger" disabled>
              Adopted Now
            </Button>
          )}
        </>
          )}
          {adoptionStatus === 'fostered' && isFostered && (
            <Button variant="danger" onClick={handleReturnClick}>
              Return from Foster Care
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}