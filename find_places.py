import requests
from place_convert import get_coordinates as gc, create_viewport as cv
from models import db, Restaurant  # Import from models.py

def find_places(location, radius):
    place_name = location
    coordinates = gc(place_name)
    
    if coordinates:
        latitude, longitude = coordinates
        location_string = f"{latitude},{longitude}"

        url = "https://map-places.p.rapidapi.com/nearbysearch/json"
        querystring = {"location": location_string, "radius": radius, "type": "restaurant"}

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

                # Save restaurant to the database if it doesn't already exist
                existing_restaurant = Restaurant.query.filter_by(name=restaurant_info['name'], address=restaurant_info['address']).first()
                if not existing_restaurant:
                    new_restaurant = Restaurant(
                        name=restaurant_info['name'],
                        address=restaurant_info['address'],
                        rating=restaurant_info['rating'],
                        total_ratings=restaurant_info['total_ratings']
                    )
                    db.session.add(new_restaurant)
                    db.session.commit()
                    restaurant_info['id'] = new_restaurant.id
                else:
                    restaurant_info['id'] = existing_restaurant.id

                simple_restaurant_data.append(restaurant_info)

            viewport = cv(latitude, longitude, lat_offset=0.002, lng_offset=0.002)
            return simple_restaurant_data, viewport
        else:
            print(f"Error occurred: {response.status_code}")
            return None, None
    else:
        print("Error: Unable to get coordinates for the specified place.")
        return None, None