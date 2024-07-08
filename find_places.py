import requests
import json
from place_convert import get_coordinates as gc
from place_convert import create_viewport as cv


def find_places(location):
    place_name = location
    coordinates = gc(place_name)

    if coordinates:
        latitude, longitude = coordinates
        location_string = f"{latitude},{longitude}"

        url = "https://map-places.p.rapidapi.com/nearbysearch/json"

        querystring = {"location": location_string, "radius": "3000", "type": "restaurant"}  # Radius in meters

        headers = {
            "x-rapidapi-key": "8e6c13aa22msh3f97d2cafc6450cp15db5ajsn5400b369bf56",  # Replace with your actual API key
            "x-rapidapi-host": "map-places.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)

        if response.status_code == 200:
            restaurants_data = response.json().get('results', [])

            simple_restaurant_data = []

            for restaurant in restaurants_data:
                restaurant_info = {
                    'name': restaurant.get('name', 'No name'),
                    'address': restaurant.get('vicinity', 'No address'),
                    'rating': restaurant.get('rating', 'No rating'),
                    'open_now': restaurant.get('opening_hours', {}).get('open_now', 'Unknown'),
                    'total_ratings': restaurant.get('user_ratings_total', 0)
                }
                simple_restaurant_data.append(restaurant_info)

            # Convert our list of simplified data to a JSON string for nicer formatting
            formatted_json = json.dumps(simple_restaurant_data, indent=4)
            print(formatted_json)
        else:
            print(f"Error occurred: {response.status_code}")

        viewport = cv(latitude, longitude, lat_offset=0.002, lng_offset=0.002)
    else:
        print("Error: Unable to get coordinates for the specified place.")
