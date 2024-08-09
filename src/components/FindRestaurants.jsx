import React, { useState } from 'react';
import axios from 'axios';
import './FindRestaurants.css';
import SwipeableCard from './SwipeableCard';
import './SwipeableCard.css';
import test from '../assets/test.png'; // Adjust the path as necessary

const GOOGLE_PLACES_API_KEY = ''; // Replace with your actual API key

function FindRestaurants() {
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [viewport, setViewport] = useState(null);
  const [criteria, setCriteria] = useState('most_likes');
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [opinions, setOpinions] = useState({}); // Store user opinions


  const findPlaces = async () => {
    console.log("Location entered:", location); // Debugging line

    try {
      const response = await axios.get('http://localhost:5000/api/find_places', {
        params: {
          location, // Send the location as a query parameter
          radius,   // Send the radius as a query parameter
        },
      });

      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const restaurantsData = response.data.results.map((restaurant) => ({
          id: restaurant.place_id,
          name: restaurant.name,
          address: restaurant.vicinity,
          rating: restaurant.rating,
          open_now: restaurant.opening_hours?.open_now ?? 'Unknown',
          total_ratings: restaurant.user_ratings_total,
          image: restaurant.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
            : 'https://via.placeholder.com/300x400?text=No+Image',
        }));

        setRestaurants(restaurantsData);
        setViewport({
          northeast: response.data.results[0].geometry.viewport.northeast,
          southwest: response.data.results[0].geometry.viewport.southwest,
        });
      } else {
        console.error('Error: No restaurants found');
        alert('No restaurants found in this area.');
      }
    } catch (error) {
      console.error('Error finding places:', error);
      alert('An error occurred while finding places.');
    }
  };

  const handleSwipe = (direction, restaurant) => {
    let opinion;
    switch (direction) {
      case 'right':
        opinion = 'like';
        break;
      case 'left':
        opinion = 'dislike';
        break;
      case 'up':
        opinion = 'no_opinion';
        break;
      default:
        return;
    }

    setOpinions((prevOpinions) => ({
      ...prevOpinions,
      [restaurant.id]: opinion,
    }));

    alert(`${opinion.charAt(0).toUpperCase() + opinion.slice(1)} registered for ${restaurant.name}`);
  };

  const fetchTopRestaurants = () => {
    const opinionCounts = {};

    restaurants.forEach((restaurant) => {
      const opinion = opinions[restaurant.id];
      if (opinion) {
        if (!opinionCounts[restaurant.name]) {
          opinionCounts[restaurant.name] = { like: 0, dislike: 0, no_opinion: 0 };
        }
        opinionCounts[restaurant.name][opinion]++;
      }
    });

    let sortedRestaurants = [];
    if (criteria === 'most_likes') {
      sortedRestaurants = Object.keys(opinionCounts)
        .map((name) => ({
          restaurant: name,
          address: restaurants.find((r) => r.name === name).address,
          count: opinionCounts[name].like,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);
    } else if (criteria === 'most_dislikes') {
      sortedRestaurants = Object.keys(opinionCounts)
        .map((name) => ({
          restaurant: name,
          address: restaurants.find((r) => r.name === name).address,
          count: opinionCounts[name].dislike,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);
    }

    setTopRestaurants(sortedRestaurants);
  };

  return (
    <div className="findRestaurantsWrapper">
      <a href="/" className="logo-link">
        <img src={test} alt="Logo" className="logo" />
      </a>
      <h1 className="Title">Find Nearby Restaurants</h1>
      <div>
        <label>
          Enter location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <br />
        <label>
          Enter radius (in meters):
          <input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} />
        </label>
        <br />
        <button onClick={findPlaces}>Find</button>
      </div>
      <div className="card-container">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <SwipeableCard key={restaurant.id} restaurant={restaurant} onSwipe={handleSwipe} />
          ))
        ) : (
          <p className="Title">No restaurants found. Please search above.</p>
        )}
      </div>
      <div id="viewport">
        {viewport && (
          <>
            <strong>Viewport</strong><br />
            Northeast: ({viewport.northeast.lat}, {viewport.northeast.lng})<br />
            Southwest: ({viewport.southwest.lat}, {viewport.southwest.lng})
          </>
        )}
      </div>
      <h2>Top 3 Restaurants</h2>
      <div>
        <label>
          Select criteria:
          <select value={criteria} onChange={(e) => setCriteria(e.target.value)}>
            <option value="most_likes">Most Likes</option>
            <option value="most_dislikes">Most Dislikes</option>
          </select>
        </label>
        <button onClick={fetchTopRestaurants}>Show Top 3</button>
      </div>
      <div id="top-results">
        {topRestaurants.map((restaurant) => (
          <div key={restaurant.restaurant} className="restaurant">
            <strong>{restaurant.restaurant}</strong><br />
            Address: {restaurant.address}<br />
            Count: {restaurant.count}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindRestaurants;
