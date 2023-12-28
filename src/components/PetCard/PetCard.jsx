import React, { useContext, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import localforage from 'localforage';
import { useNavigate } from 'react-router-dom';
import './PetCard.css';
import animalFakeImg from '../../styles/icons/alt-instead-pet-photo.jpg';
import likeIcon from '../../styles/icons/heart-filled.png';
import unlikeIcon from '../../styles/icons/heart-outlined.png';
import { AuthContext } from '../../context/AuthProvider';
import { useMyPetsContext } from '../../context/MyPetsProvider';

export default function PetCard({ pet, showLikeButton = true }) {
  if (!pet) {
    return null;
  }

  const { id, picture, name, adoptionStatus } = pet;
  const imageUrl = picture || animalFakeImg;
  const isDefaultImage = picture === null;

  const [showAlert, setShowAlert] = useState(false);
  const { handleLikeClick, isLiked } = useMyPetsContext();
  const { user } = useContext(AuthContext);
  const isAuthenticated = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetsData = async () => {
      try {
        const storedPetsData = await localforage.getItem('pets') || [];
        setPetsData(storedPetsData);

        const adopted = storedPetsData.filter((pet) => pet.adoptionStatus === 'adopted');
        const fostered = storedPetsData.filter((pet) => pet.adoptionStatus === 'fostered');
        const adoptable = storedPetsData.filter((pet) => pet.adoptionStatus === 'adoptable');

        setAdoptedCount(adopted.length);
        setFosteredCount(fostered.length);
        setAdoptableCount(adoptable.length);
      } catch (error) {
        console.error('Error fetching pets data:', error);
      }
    };

    fetchPetsData();
  }, []);

  const handleLike = async () => {
    if (isAuthenticated) {
      try {
        await handleLikeClick(pet);
      } catch (error) {
        console.error('Error updating liked status:', error);
      }
    } else {
      setShowAlert(true);
    }
  };

  const handleSeeMore = () => {
    navigate(`/pets/${id}`);
  };

  return (
    <>
      {showAlert && (
        <Alert
          className="alert-modal-ask-login"
          variant="warning"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <p>Please log in to add a Like</p>
        </Alert>
      )}
      <div className="pet-card-container">
        <Card className="pet-card">
          {imageUrl && (
            <div className="custom-frame">
              <Card.Img
                variant="top"
                src={imageUrl}
                alt={`Image of ${name}`}
                className={`card-img ${isDefaultImage ? 'default-img' : ''}`}
              />
            </div>
          )}
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{adoptionStatus}</Card.Text>
            <button className="pet-card-btn" onClick={handleSeeMore}>
              See more
            </button>
            {isAuthenticated && showLikeButton && (
              <button className="like-btn" onClick={handleLike}>
                <img
                  src={isLiked(pet) ? likeIcon : unlikeIcon}
                  alt={isLiked(pet) ? 'Like' : 'Unlike'}
                  className="like-icon"
                />
              </button>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}