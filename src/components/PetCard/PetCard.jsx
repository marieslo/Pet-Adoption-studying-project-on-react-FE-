import React from 'react';
import Card from 'react-bootstrap/Card';
import './PetCard.css';

export default function PetCard({ pet }) {
  if (!pet) {
    return null;
  }

  const { id, name, status, image } = pet; 

  const hasImage = image && typeof image === 'string';
  const defaultImageUrl = '../../styles/icons/alt-instead-pet-photo.png';

  return (
    <div className='pet-card-container'>
      <Card className='pet-card'>
        {hasImage && (
          <div className="custom-frame">
            <Card.Img
              variant="top"
              src={image}
              alt={`Image of ${name}`}
              className="card-img"
            />
          </div>
        )}
        {!hasImage && (
          <div className="custom-frame">
            <Card.Img
              variant="top"
              src={defaultImageUrl}
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