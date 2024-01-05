import React, { useEffect } from 'react';
import { useMyPetsContext } from '../context/MyPetsProvider';
import Wishlist from '../components/Wishlist/Wishlist';


export default function MyPetsModalContent({ pets, userId }) {
  const { fosteredPets, adoptedPets, likedPets } = useMyPetsContext();

  const getUserPets = () => {
    switch (pets) {
      case 'fostered':
        return fosteredPets;
      case 'adopted':
        return adoptedPets;
      case 'liked':
        return likedPets;
      default:
        return [];
    }
  };

  useEffect(() => {
  }, [userId]);
  
  return (
  <Wishlist pets={getUserPets()} />
  )
}