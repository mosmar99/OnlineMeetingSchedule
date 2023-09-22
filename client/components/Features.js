import React from 'react';
import './Features.css'; // Import your CSS file for styling

const Features = () => {
  return (
    <div className="features">
      <div className="feature">
        <i className="fas fa-check-circle"></i>
        <h3>Feature 1</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className="feature">
        <i className="fas fa-check-circle"></i>
        <h3>Feature 2</h3>
        <p>Nullam quis felis eget nunc laoreet ultricies.</p>
      </div>

      <div className="feature">
        <i className="fas fa-check-circle"></i>
        <h3>Feature 3</h3>
        <p>Sed sed turpis eget turpis cursus bibendum.</p>
      </div>

    </div>
  );
}

export default Features;
