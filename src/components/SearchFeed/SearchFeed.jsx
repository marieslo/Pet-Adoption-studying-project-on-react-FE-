import React from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import PetCard from '../PetCard/PetCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FetchPetsProvider, useFetchPets } from '../../context/FetchPetsContext.jsx';

export default function SearchFeed({ selectedCategory }) {
  return (
    <FetchPetsProvider selectedCategory={selectedCategory}>
      <SearchFeedContent />
    </FetchPetsProvider>
  );
}

function SearchFeedContent() {
  const { petsData, loading, hasMore, fetchPetsData } = useFetchPets(selectedCategory);

  return (
    <Container className='searchfeed-container'>
      <InfiniteScroll
        dataLength={petsData.length}
        next={fetchPetsData}
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