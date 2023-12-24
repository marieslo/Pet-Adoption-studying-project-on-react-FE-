import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './PetCard.css';
import animalShelterIcon from '../../styles/icons/animal-shelter.png';
import likeIcon from '../../styles/icons/heart-filled.png';
import unlikeIcon from '../../styles/icons/heart-outlined.png';

export default function PetCard({ pet, onLike }) {
  if (!pet) {
    return null;
  }

  const { id, name, status, image } = pet;
  const imageUrl = image ?? animalShelterIcon;

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    onLike(pet, newLikeStatus);
  };

  useEffect(() => {
    setIsLiked(false); 
  }, [pet]);

  return (
    <div className='pet-card-container'>
      <Card className='pet-card'>
        {imageUrl && (
          <div className="custom-frame">
            <Card.Img
              variant="top"
              src={imageUrl}
              alt={`Image of ${name}`}
              className="card-img"
            />
          </div>
        )}
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{status}</Card.Text>
          <Link to={`/pets/${id}`}>
            <button className='pet-card-btn'>See more</button>
          </Link>
          <button className='like-btn' onClick={handleLike}>
            <img
              src={isLiked ? likeIcon : unlikeIcon}
              alt={isLiked ? 'Like' : 'Unlike'}
              className="like-icon"
            />
          </button>
        </Card.Body>
      </Card>
    </div>
  );
}