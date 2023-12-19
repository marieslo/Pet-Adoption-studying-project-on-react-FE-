import React from 'react'

export default function SinglePetPage({ pet }) {
    const { name, status, photos, description, breeds } = pet;
    const hasPhotos = photos && photos.length > 0;
  
    const getBreedsString = (breeds) => {
      if (breeds) {
        const { primary, secondary, mixed, unknown } = breeds;
        const breedArray = [];
    
        if (primary) {
          breedArray.push(primary);
        }
    
        if (secondary) {
          breedArray.push(secondary);
        }
    
        if (mixed) {
          breedArray.push('Mixed');
        }
    
        if (unknown) {
          breedArray.push('Unknown');
        }
    
        return breedArray.join(', ');
      }
    
      return 'Unknown';
    };
  
    return (
      <div className='pet-card-container'>
        <Card className='pet-card'>
          {hasPhotos && (
            <div className="custom-frame">
              <Card.Img
                variant="top"
                src={photos[0].medium}
                alt={`Image of ${name}`}
                style={{
                  width: '300px',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '50px',
                }}
              />
            </div>
          )}
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>Status: {status}</Card.Text>
            <Card.Text>Breeds: {getBreedsString(breeds)}</Card.Text>
            <Card.Text>{description}</Card.Text>
            <button className='pet-card-btn'>See more</button>
          </Card.Body>
        </Card>
      </div>
    );
  }