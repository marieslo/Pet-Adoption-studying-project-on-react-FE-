import React from 'react';
import './Spinner.css';

export default function Spinner() {
  return (
    <div className="preloader">
      <div className="container-fluid">
        <div className="spinner">
          <span className="ball-1"></span>
          <span className="ball-2"></span>
          <span className="ball-3"></span>
          <span className="ball-4"></span>
        </div>
      </div>
    </div>
  );
}