import React from 'react';
import Card from 'react-bootstrap/Card';
import dogIcon from '../../styles/icons/dog.png';
import catIcon from '../../styles/icons/cat.png';
import otherAnimalsIcon from '../../styles/icons/other.png';
import './SearchBarOptions.css';

export default function BasicSearch({ onSearch }) {
  const handleCategoryClick = (type) => {
    onSearch({ type });
  };

  const SearchCategory = ({ category, icon }) => (
    <Card onClick={() => handleCategoryClick(category)} className="search-category-card">
      <div className="card-title">{category}</div>
      <img src={icon} alt={`${category} icon`} className="category-icon" />
    </Card>
  );

  const categories = [
    { category: 'Dog', icon: dogIcon },
    { category: 'Cat', icon: catIcon },
    { category: 'Other', icon: otherAnimalsIcon },
  ];

  return (
    <div className='category-cards-container'>
      {categories.map((categoryData, index) => (
        <SearchCategory key={index} category={categoryData.category} icon={categoryData.icon} />
      ))}
    </div>
  );
}