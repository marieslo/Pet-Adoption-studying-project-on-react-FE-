import React from 'react';
import Card from 'react-bootstrap/Card';
import './PetCard.css';

export default function PetCard({ pet }) {
  if (!pet) {
    return null;
  }

  const { name, status, photos } = pet;
  const hasPhotos = photos && photos.length > 0;

  return (
    <div className='pet-card-container'>
      <Card className='pet-card'>
        {hasPhotos && (
          <div className="custom-frame">
            <Card.Img
              variant="top"
              src={photos[0].large}
              alt={`Image of ${name}`}
              className="card-img"
            />
          </div>
        )}
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{status}</Card.Text>
          <button className='pet-card-btn'>See more</button>
        </Card.Body>
      </Card>
    </div>
  );
}