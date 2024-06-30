import React from 'react';

const StarRating = ({ rating, onRating }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {stars.map(star => (
        <span
          key={star}
          onClick={() => onRating(star)}
          style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
