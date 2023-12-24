import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './SinglePetPage.css';
import fakePetsData from '../../fakepetsdata/fakepetsdata.json';

export default function SinglePetPage() {
  const { id } = useParams();
  const petData = fakePetsData.petsData.find((pet) => pet.id === parseInt(id, 10));

  if (!petData) {
    return <div>Loading...</div>;
  }

  const {
    name,
    type,
    status,
    image,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed,
  } = petData;

  const isOwner = false; 
  const isFostered = false; 
  const isAdopted = false;

  const handleAdoptClick = () => {
    console.log(`Adopt ${name}`);
  };

  const handleFosterClick = () => {
    console.log(`Foster ${name}`);
  };

  const handleReturnClick = () => {
    console.log(`Return ${name}`);
  };

  const handleSaveToggle = () => {
    console.log(`Save/Unsave ${name}`);
  };

  return (
    <div className='single-pet-card-container'>
      <Card className='single-page-pet-card'>
        

        <Card.Body>
        <div className="custom-frame">
          <Card.Img
            variant="top"
            src={image}
            alt={`Image of ${name}`}
            className="card-img"
            onLoad={() => console.log('Image loaded')}
          />
          </div>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Type: {type}</Card.Text>
          <Card.Text>Status: {status}</Card.Text>
          <Card.Text>Height: {height}</Card.Text>
          <Card.Text>Weight: {weight}</Card.Text>
          <Card.Text>Color: {color}</Card.Text>
          <Card.Text>Bio: {bio}</Card.Text>
          <Card.Text>Hypoallergenic: {hypoallergenic ? 'Yes' : 'No'}</Card.Text>
          <Card.Text>Dietary Restrictions: {dietaryRestrictions}</Card.Text>
          <Card.Text>Breed: {breed}</Card.Text>

          {isOwner ? (
            <Button variant="danger" onClick={handleReturnClick}>
              Return to Adoption Center
            </Button>
          ) : (
            <>
              {isFostered ? (
                <Button variant="primary" onClick={handleAdoptClick}>
                  Adopt
                </Button>
              ) : (
                <Button variant="success" onClick={handleFosterClick}>
                  Foster
                </Button>
              )}
            </>
          )}
          <Button variant="secondary" onClick={handleSaveToggle}>
            {isAdopted ? 'Unsave' : 'Save for Later'}
          </Button>
          
        </Card.Body>
      </Card>
    </div>
  );
}