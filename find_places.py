import requests
import json
from flask import Flask, request, jsonify, render_template
from place_convert import get_coordinates as gc
from place_convert import create_viewport as cv

app = Flask(__name__)

def find_places(location, radius):
    place_name = location
    coordinates = gc(place_name)

    if coordinates:
        latitude, longitude = coordinates
        location_string = f"{latitude},{longitude}"

        url = "https://map-places.p.rapidapi.com/nearbysearch/json"
        querystring = {"location": location_string, "radius": radius, "type": "restaurant"}  # Radius in meters

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

            viewport = cv(latitude, longitude, lat_offset=0.002, lng_offset=0.002)
            return simple_restaurant_data, viewport
        else:
            print(f"Error occurred: {response.status_code}")
            return None, None
    else:
        print("Error: Unable to get coordinates for the specified place.")
        return None, None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/find_places', methods=['POST'])
def find_places_endpoint():
    location = request.form['location']
    radius = request.form['radius']
    restaurants, viewport = find_places(location)
    if restaurants is not None:
        return jsonify({'restaurants': restaurants, 'viewport': viewport})
    else:
        return jsonify({'error': 'Unable to find places'}), 500

def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()
