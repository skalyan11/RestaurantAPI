import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import axios from 'axios';
import './SwipeableCard.css';
import { useAuth } from '../contexts/auth/index1';

const SwipeableCard = ({ restaurant, onSwipe }) => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  const userId = currentUser ? currentUser.uid : null;

  if (!userId) {
    console.error('User is not authenticated');
    return null;
  }

  const [swipeDirection, setSwipeDirection] = useState(null);

  const swiped = async (direction, restaurant) => {
    console.log('Swiped function called');
    setSwipeDirection(direction);
    setTimeout(() => setSwipeDirection(null), 1000);
    onSwipe(direction, restaurant);

    try {
      await axios.post('http://localhost:5001/api/swipe', {
        userId,
        restaurantId: restaurant.id,
        swipeDirection: direction
      });
      console.log('Swipe interaction recorded');
    } catch (error) {
      console.error('Error recording swipe interaction:', error);
    }
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
        <div className='name'>{restaurant.name}</div>
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