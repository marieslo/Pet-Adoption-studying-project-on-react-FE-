import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import PetCard from '../SinglePetPage/PetCard';
import './SearchPage.css';

export default function SearchFeed() {
  const [petsData, setPetsData] = useState([]);

  useEffect(() => {
    const getAccessToken = async () => {
      const clientId = 'L5ows7wTtxeTesA1Ko6FB2Ml601ReOOQR3zmk0NcvM690mAXkY';
      const clientSecret = '81WeA8ISDlJyA7sAvFzUephFDBUA1O6VNepENcHr';

      try {
        const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        });

        if (!response.ok) {
          throw new Error('Failed to obtain access token');
        }

        const data = await response.json();
        const accessToken = data.access_token;


        fetchPetsData(accessToken);
      } catch (error) {
        console.error('Error getting access token:', error.message);
      }
    };

    const fetchPetsData = async (accessToken) => {
      try {
        const response = await fetch('https://api.petfinder.com/v2/animals?type=dog&page=1', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch pet data');
        }

        const data = await response.json();
        setPetsData(data.animals || []);
      } catch (error) {
        console.error('Error fetching pet data:', error.message);
      }
    };


    getAccessToken();
  }, []);

  return (
    <Container>
      <Stack gap={3}>
        {petsData.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </Stack>
    </Container>
  );
}