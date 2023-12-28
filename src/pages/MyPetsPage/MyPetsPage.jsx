import React, { useEffect } from 'react';
import PetCard from '../../components/PetCard/PetCard';
import localforage from 'localforage';
import './MyPetsPage.css';
import ButtonToSearchPage from '../../components/ButtonToSearchPage/ButtonToSearchPage';
import { useMyPetsContext } from '../../context/MyPetsProvider';

export default function MyPetsPage() {
  const { 
    likedPets, 
    setLikedPetsAsync, 
    adoptedPets, 
    setAdoptedPetsAsync, 
    fosteredPets, 
    setFosteredPetsAsync, 
    user 
  } = useMyPetsContext();

  useEffect(() => {
    const fetchDataFromLocalForage = async () => {
      try {
        if (user && user.id) {
          const storedLikedPets = (await localforage.getItem(`likedPets_${user.id}`)) || [];
          setLikedPetsAsync(storedLikedPets);
  
          const storedAdoptedPets = (await localforage.getItem(`adoptedPets_${user.id}`)) || [];
          setAdoptedPetsAsync(storedAdoptedPets);
  
          const storedFosteredPets = (await localforage.getItem(`fosteredPets_${user.id}`)) || [];
          setFosteredPetsAsync(storedFosteredPets);
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
  
    fetchDataFromLocalForage();
  }, [setLikedPetsAsync, setAdoptedPetsAsync, setFosteredPetsAsync, user]);

  const hasLikedPets = likedPets.length > 0;
  const hasAdoptedPets = adoptedPets.length > 0;
  const hasFosteredPets = fosteredPets.length > 0;

  return (
    <div className='my-pets-page-container'>
      <div className='my-pets-lists-wrapper'>
        {hasLikedPets && (
          <div className='pets-section'>
            <h2>Saved for later</h2>
            <div className='pets-list liked'>
              {likedPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          </div>
        )}

        {hasAdoptedPets && (
          <div className='pets-section'>
            <h2>Adopted</h2>
            <div className='pets-list adopted'>
              {adoptedPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          </div>
        )}

        {hasFosteredPets && (
          <div className='pets-section'>
            <h2>Fostered</h2>
            <div className='pets-list fostered'>
              {fosteredPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          </div>
        )}

        {!hasLikedPets && !hasAdoptedPets && !hasFosteredPets && (
          <>
            <div className='msg-if-no-pets'>
              <p>You haven't liked, adopted, or fostered any pets yet</p>
            </div>
            <ButtonToSearchPage />
          </>
        )}
      </div>
    </div>
  );
}