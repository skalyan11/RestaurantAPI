import React, { useState } from 'react';
import axios from 'axios';
import './FindRestaurants.css';
import SwipeableCard from './SwipeableCard';
import './SwipeableCard.css';
import test from '../assets/test.png'; // Adjust the path as necessary
//import { app, analytics } from '../firebaseConfig'; // Import Firebase configuration


const GOOGLE_PLACES_API_KEY = ''; // Replace with your actual API key

function FindRestaurants() {
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [viewport, setViewport] = useState(null);
  const [criteria, setCriteria] = useState('most_likes');
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [opinions, setOpinions] = useState({});
  const [showSearch, setShowSearch] = useState(true); // State to toggle search visibility

  const findPlaces = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/find_places', {
        params: { location, radius },
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
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${'AIzaSyCAf_kHgJYaIyOy9OLfDNtoOHIWRV_FChw'}`
            : 'https://via.placeholder.com/300x400?text=No+Image',
        }));

        setRestaurants(restaurantsData);
        setViewport(response.data.results[0].geometry.viewport);
        setShowSearch(false); // Hide the search section after finding places
      } else {
        alert('No restaurants found in this area.');
      }
    } catch (error) {
      console.error('Error finding places:', error);
      alert('An error occurred while finding places.');
    }
  };

  const handleSwipe = (direction, restaurant) => {
    const opinionsMap = {
      'right': 'like',
      'left': 'dislike',
      'up': 'no_opinion',
    };

    const opinion = opinionsMap[direction];
    if (!opinion) return;

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

    const sortedRestaurants = Object.keys(opinionCounts)
      .map((name) => ({
        restaurant: name,
        address: restaurants.find((r) => r.name === name).address,
        count: opinionCounts[name][criteria === 'most_likes' ? 'like' : 'dislike'],
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    setTopRestaurants(sortedRestaurants);
  };

  return (
    <div className="findRestaurantsWrapper">
      <div className="header">
        <a href="/" className="logo-link">
          <img src={test} alt="Logo" className="logo" />
        </a>
        {!showSearch && (
          <button className="search-again-button" onClick={() => setShowSearch(true)}>
            Search Again
          </button>
        )}
      </div>
      <h1 className="title">Find Nearby Restaurants</h1>
      
      {showSearch && (
        <div className="search-section">
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
      )}

      <div className="card-container">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <SwipeableCard key={restaurant.id} restaurant={restaurant} onSwipe={handleSwipe} />
          ))
        ) : (
          <p className={showSearch ? "title" : "hidden-text"}>No restaurants found. Please search above.</p>
        )}
      </div>

      {viewport && (
        <div id="viewport" className="viewport">
          <strong>Viewport</strong><br />
          Northeast: ({viewport.northeast.lat}, {viewport.northeast.lng})<br />
          Southwest: ({viewport.southwest.lat}, {viewport.southwest.lng})
        </div>
      )}
      
      <div className="top-restaurants-section">
        <h2>Top 3 Restaurants</h2>
        <label>
          Select criteria:
          <select value={criteria} onChange={(e) => setCriteria(e.target.value)}>
            <option value="most_likes">Most Likes</option>
            <option value="most_dislikes">Most Dislikes</option>
          </select>
        </label>
        <button onClick={fetchTopRestaurants}>Show Top 3</button>

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
    </div>
  );
}

export default FindRestaurants;