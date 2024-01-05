import React, { useEffect } from 'react';
import localforage from 'localforage';
import './MyPetsPage.css';
import { useMyPetsContext } from '../../context/MyPetsProvider';
import { useFetchPets } from '../../context/FetchPetsContext';
import AdoptablePetsFeed from '../../components/AdoptablePetsFeed/AdoptablePetsFeed';
import Wishlist from '../../components/Wishlist/Wishlist';

export default function MyPetsPage() {
  const {
    likedPets,
    setLikedPetsAsync,
    adoptedPets,
    setAdoptedPetsAsync,
    fosteredPets,
    setFosteredPetsAsync,
    user,
  } = useMyPetsContext();

  const { petsData } = useFetchPets();

  useEffect(() => {
    const fetchDataFromLocalForage = async () => {
      try {
        if (user && user.id) {
       
          const storedLikedPets = (await localforage.getItem(`likedPets_${user.id}`)) || [];
          const storedAdoptedPets = (await localforage.getItem(`adoptedPets_${user.id}`)) || [];
          const storedFosteredPets = (await localforage.getItem(`fosteredPets_${user.id}`)) || [];
          setLikedPetsAsync(storedLikedPets);
          setAdoptedPetsAsync(storedAdoptedPets);
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
    <>
      <div className='my-pets-page-container'>
        <div className='my-pets-lists-wrapper'>
        <Wishlist pets={likedPets} petsData={petsData} title="Saved for later" cssClass="saved" />
        <Wishlist pets={fosteredPets} petsData={petsData} title="Fostered" cssClass="fostered" />
        <Wishlist pets={adoptedPets} petsData={petsData} title="Adopted" cssClass="adopted" />

          {!hasLikedPets && !hasAdoptedPets && !hasFosteredPets && (
            <div className='they-need-your-love'>
              <p >
                For now, you don't have any saved, adopted, or fostered pets.
                <br/>
                <br/>
                <br/>
                Take a look at adoptable ones
              </p>
              <div className="mypets-page-petsfeed-container">
              <AdoptablePetsFeed />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}