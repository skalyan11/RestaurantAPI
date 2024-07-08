import requests
import json
from place_convert import get_coordinates as gc
from place_convert import create_viewport as cv

place_name = 'Naperville Illinois'
coordinates = gc(place_name)

if coordinates:
    latitude, longitude = coordinates
    location_string = f"{latitude},{longitude}"

url = "https://map-places.p.rapidapi.com/nearbysearch/json"

querystring = {"location": location_string, "radius":"30", "type":"restaurant"}

headers = {
	"x-rapidapi-key": "8e6c13aa22msh3f97d2cafc6450cp15db5ajsn5400b369bf56",
	"x-rapidapi-host": "map-places.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

viewport = cv(latitude, longitude, lat_offset=0.002, lng_offset=0.002)


# JSON parser
response = requests.get(url, headers=headers, params=querystring)

if response.status_code == 200:
    
    restaurants_data = response.json()['results']

   
    simple_restaurant_data = []

    
    for restaurant in restaurants_data:
        restaurant_info = {
            'name': restaurant['name'],
            'address': restaurant['vicinity'],
            'rating': restaurant.get('rating', 'No rating'),  # Use .get for safe access in case key is not present
            'open_now': restaurant.get('opening_hours', {}).get('open_now', 'Unknown'),  # Nested get for nested dictionary
            'total_ratings': restaurant.get('user_ratings_total', 0)
        }
        simple_restaurant_data.append(restaurant_info)

    # Convert our list of simplified data to a JSON string for nicer formatting
    formatted_json = json.dumps(simple_restaurant_data, indent=4)
    print(formatted_json)

else:
    print(f"Error occurred: {response.status_code}")