import React, { useState } from 'react';
import './FindRestaurants.css'; // Rename the CSS file to avoid conflicts

function FindRestaurants() {
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [viewport, setViewport] = useState(null);
  const [criteria, setCriteria] = useState('most_likes');
  const [topRestaurants, setTopRestaurants] = useState([]);

  const findPlaces = () => {
    // Mocked response for finding places
    const mockedRestaurants = [
      {
        id: 1,
        name: 'Mocked Restaurant 1',
        address: '123 Mock St, Mock City',
        rating: '4.5',
        open_now: true,
        total_ratings: 150
      },
      // Add more mocked restaurants as needed
    ];
    const mockedViewport = {
      northeast: { lat: 40.785091, lng: -73.968285 },
      southwest: { lat: 40.764091, lng: -73.948285 }
    };

    setRestaurants(mockedRestaurants);
    setViewport(mockedViewport);
  };

  const submitOpinion = (restaurantId, opinion) => {
    alert(`Opinion submitted for restaurant ID ${restaurantId}: ${opinion}`);
  };

  const fetchTopRestaurants = () => {
    // Mocked response for top restaurants
    const mockedTopRestaurants = [
      {
        restaurant: 'Mocked Restaurant 1',
        address: '123 Mock St, Mock City',
        count: 120
      },
      // Add more mocked top restaurants as needed
    ];

    setTopRestaurants(mockedTopRestaurants);
  };

  return (
    <div className="findRestaurantsWrapper">
    <div className="App">
      <h1 className='Title'>Find Nearby Restaurants</h1>
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
      <div id="results">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant">
            <strong>{restaurant.name}</strong><br />
            Address: {restaurant.address}<br />
            Rating: {restaurant.rating}<br />
            Open Now: {restaurant.open_now ? 'Yes' : 'No'}<br />
            Total Ratings: {restaurant.total_ratings}<br />
            <div className="opinion-buttons">
              <button onClick={() => submitOpinion(restaurant.id, 'like')}>Like</button>
              <button onClick={() => submitOpinion(restaurant.id, 'dislike')}>Dislike</button>
              <button onClick={() => submitOpinion(restaurant.id, 'no_opinion')}>No Opinion</button>
            </div>
          </div>
        ))}
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
    </div>
  );
}

export default FindRestaurants;
