import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const GOOGLE_PLACES_API_KEY = 'AIzaSyCbRJ7FrdlcDs_h4tUp-fHyRCtFSZoDWhQ'; // Replace with your actual API key

const getCoordinates = async (placeName) => {
  try {
    const encodedPlaceName = encodeURIComponent(placeName);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedPlaceName}&format=json`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'YourAppNameOrEmail', // Optional but recommended for identifying your app
      },
    });

    if (response.status === 200 && response.data.length > 0) {
      const firstResult = response.data[0];
      return `${firstResult.lat},${firstResult.lon}`;
    } else {
      console.error(`Place not found: ${placeName}`);
      return null;
    }
  } catch (error) {
    console.error(`Error occurred: ${error.response?.status || error.message}`);
    return null;
  }
};

app.get('/api/find_places', async (req, res) => {
  const { location, radius } = req.query;

  console.log(`Received request for location: ${location} with radius: ${radius}`);

  const coordinates = await getCoordinates(location);

  if (!coordinates) {
    return res.status(400).send('Invalid location');
  }

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: coordinates, // Use coordinates here
        radius,
        type: 'restaurant',
        key: GOOGLE_PLACES_API_KEY,
      },
    });

    console.log('API Response:', response.data);

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      res.json(response.data);
    } else {
      console.error('Error: No restaurants found or status not OK');
      res.status(404).send('No restaurants found or invalid request');
    }
  } catch (error) {
    console.error('Error finding places:', error.message);
    res.status(500).send('Error finding places');
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
