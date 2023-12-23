import React from 'react';
import Card from 'react-bootstrap/Card';
import './SearchCategoryCard.css';
import dogIcon from '../../styles/icons/dog.png';
import catIcon from '../../styles/icons/cat.png'; 
import otherAnimalsIcon from '../../styles/icons/other.png'; 

export default function SearchCategoryCard({ category, onClick }) {
  const getIcon = () => {
    switch (category.toLowerCase()) {
      case 'dogs':
        return dogIcon;
      case 'cats':
        return catIcon;
      case 'other animals':
        return otherAnimalsIcon;
      default:
        return null;
    }
  };

  return (
    <div className='search-category-card-container'>
      <Card onClick={onClick} className="search-category-card">
        <Card.Body>
          <Card.Title>{category}</Card.Title>
          <img src={getIcon()} alt={`${category} icon`} className="category-icon" />
        </Card.Body>
      </Card>
    </div>
  );
}