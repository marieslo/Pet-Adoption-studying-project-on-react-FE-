import React from 'react';
import PetCard from '../../components/PetCard/PetCard';

export default function Wishlist({ pets = [], petsData, title, cssClass }) {
  const hasPets = pets.length > 0;

  return (
    <div className='pets-section'>
      {hasPets && <h2 className={`my-pets-${cssClass}`}>{title}:</h2>}
      <div className={`pets-list ${cssClass}`}>
        {hasPets ? (
          pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} petsData={petsData} />
          ))
        ) : (
          <p className='no-pets'></p>
        )}
      </div>
    </div>
  );
}