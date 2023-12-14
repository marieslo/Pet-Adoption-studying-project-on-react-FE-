import React from 'react';

export default function PetCard({ pet }) {
  const { name, type, adoptionStatus, height, weight } = pet;

  return (
    <div className="pet-card">
      <h2>{name}</h2>
      <p>Type: {type}</p>
      <p>Adoption Status: {adoptionStatus}</p>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
    </div>
  );
}