import React, { useState } from 'react';

export default function AdminAddPetForm() {
 
  const [petDetails, setPetDetails] = useState({
    name: '',
    species: '',
   
  });

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Adding pet:', petDetails);
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Add Pet</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={petDetails.name} onChange={handleChange} />
        </label>
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
}