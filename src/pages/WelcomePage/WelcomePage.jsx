import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import Header from '../../components/Header/Header';
// import { useFetchPets } from '../../context/FetchPetsContext.jsx';
// import PetCard from '../../components/PetCard/PetCard';

export default function WelcomePage() {
  const navigate = useNavigate();
  // const { petsData, loading, hasMore, fetchPetsData } = useFetchPets();

  // useEffect(() => {
  //   fetchPetsData(null, 1, 3);
  // }, [fetchPetsData]);

  const handleSearch = () => {
    navigate('/search');
  };

  return (
    <div className='welcome-page-container'>
      <div className='wrapper-for-header-welcometext-and-search-btn'>
       <Header/>
      <section className='welcome-text'>
        <p>Are you planning to adopt a pet?</p>
        <p>We collaborate with shelters to provide loving homes for pets in need.</p>
        <p>Our user-friendly platform will make the adoption process seamless and informed.</p>
      </section>
      <button className="search-button" onClick={handleSearch}>
        Search a pet
      </button>
      </div>
      {/* <section className="random-pet-cards">
        {petsData.slice(0, 3).map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </section> */}
    </div>
  );
}