import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import './SwipeableCard.css';


const SwipeableCard = ({ restaurant, onSwipe }) => {
  const [swipeDirection, setSwipeDirection] = useState(null);

  const swiped = (direction, restaurant) => {
    setSwipeDirection(direction); // Set the swipe direction for visual feedback
    setTimeout(() => setSwipeDirection(null), 1000); // Clear the feedback after 1 second
    onSwipe(direction, restaurant);
  };

  const outOfFrame = (name) => {
    console.log(`${name} left the screen!`);
  };

  return (
    <TinderCard
      className="swipe"
      key={restaurant.id}
      onSwipe={(dir) => swiped(dir, restaurant)}
      onCardLeftScreen={() => outOfFrame(restaurant.name)}
    >
      <div
        style={{ backgroundImage: 'url(' + restaurant.image + ')' }}
        className="card"
      >
        <h3>{restaurant.name}</h3>
        {swipeDirection && (
          <div className={`swipe-feedback ${swipeDirection}`}>
            {swipeDirection === 'right' && 'Like'}
            {swipeDirection === 'left' && 'Dislike'}
            {swipeDirection === 'up' && 'Skip'}
          </div>
        )}
      </div>
    </TinderCard>
  );
};

export default SwipeableCard;
