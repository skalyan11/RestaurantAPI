import React from 'react';
import TinderCard from 'react-tinder-card';

const SwipeableCard = ({ restaurant, onSwipe }) => {
  const swiped = (direction, restaurant) => {
    onSwipe(direction, restaurant);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
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
      </div>
    </TinderCard>
  );
};

export default SwipeableCard;
