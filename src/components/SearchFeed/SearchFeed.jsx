import React, { useState, useEffect } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import PetCard from '../PetCard/PetCard';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function SearchFeed() {
  const [petsData, setPetsData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchPetsData = async (accessToken, currentPage, fetchLimit) => {
    try {
      setLoading(true);

      const response = await fetch(`https://api.petfinder.com/v2/animals?type=dog&page=${currentPage}&limit=${fetchLimit}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pet data');
      }

      const data = await response.json();
      const newPetsData = data.animals || [];
      const petsWithPhotos = newPetsData.filter(pet => pet.photos && pet.photos.length > 0);

      setPetsData((prevData) => [...prevData, ...petsWithPhotos]);
      setPage(currentPage + 1);
      setHasMore(petsWithPhotos.length > 0);
    } catch (error) {
      console.error('Error fetching pet data:', error.message);
    } finally {
      setLoading(false);
    }
  };

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
      return accessToken;
    } catch (error) {
      console.error('Error getting access token:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        fetchPetsData(accessToken, page, limit);
      }
    };

    fetchData();
  }, [page]);

  return (
    <Container className='searchfeed-container'>
      <InfiniteScroll
        dataLength={petsData.length}
        next={() => setPage(page => page + 1)}
        hasMore={hasMore}
        loader={<Spinner />}
        endMessage={<p>No more pets to show</p>}
      >
        <Row xs={1} md={2} lg={4} className='g-4'>
          {petsData
            .filter(pet => pet.photos && pet.photos.length > 0)
            .map((pet, index) => (
              <Col key={`${pet.id}-${index}`} className='mb-4'>
                <PetCard pet={pet} />
              </Col>
            ))}
        </Row>
      </InfiniteScroll>
    </Container>
  );
}