import requests
from urllib.parse import quote_plus

def get_coordinates(place_name):
    """
    Get the latitude and longitude coordinates of a place by name using OpenStreetMap's Nominatim API.

    :param place_name: A string representing the name of the place to find.
    :return: A tuple of the form (latitude, longitude), or None if not found.
    """
    # Nominatim user agent, it's good practice to set this to your application's name or your email
    headers = {
        'User-Agent': 'AppNameOrEmail'
    }
    
    # URL-encode the place name
    encoded_place_name = quote_plus(place_name)
    url = f'https://nominatim.openstreetmap.org/search?q={encoded_place_name}&format=json'

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()

        if data:
            # Assume the first result is the most relevant
            first_result = data[0]
            return float(first_result['lat']), float(first_result['lon'])
        else:
            print(f"Place not found: {place_name}")
            return None
    else:
        print(f"Error occurred: {response.status_code}")
        return None
