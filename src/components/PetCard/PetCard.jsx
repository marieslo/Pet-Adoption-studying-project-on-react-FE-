import React, { useContext, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import './PetCard.css';
import localforage from 'localforage';
import { AuthContext } from '../../context/AuthProvider';
import { useMyPetsContext } from '../../context/MyPetsProvider';
import { FetchPetsContext } from '../../context/FetchPetsContext';
import animalFakeImg from '../../styles/icons/alt-instead-pet-photo.jpg';
import likeIcon from '../../styles/icons/heart-filled.png';
import unlikeIcon from '../../styles/icons/heart-outlined.png';


export default function PetCard({ pet, showLikeButton = true }) {

  if (!pet) {
    return null;
  }

  const { id, picture, name, adoptionStatus } = pet;
  const imageUrl = picture || animalFakeImg;
  const isDefaultImage = picture === null;

  const [showAlert, setShowAlert] = useState(false);

  const { handleLikeClick, isLiked } = useMyPetsContext();
  const { setPetsData } = useContext(FetchPetsContext);
  const { user } = useContext(AuthContext);
  const isAuthenticated = !!user;
  const navigate = useNavigate();

  const { adoptedPets, fosteredPets } = useMyPetsContext();
  const isAdopted = adoptedPets.some((adoptedPet) => adoptedPet.id === id);
  const isFostered = fosteredPets.some((fosteredPet) => fosteredPet.id === id);

  useEffect(() => {
    const fetchPetsData = async () => {
      try {
        const storedPetsData = await localforage.getItem('pets') || [];
        setPetsData(storedPetsData);
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
            <Card.Text>{isAdopted ? 'adopted' : (isFostered ? 'fostered' : adoptionStatus)}</Card.Text>
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