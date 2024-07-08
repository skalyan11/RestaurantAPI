import requests
from urllib.parse import quote_plus

def get_coordinates(place_name):
    
    headers = {
        'User-Agent': 'AppNameOrEmail'
    }
    
  
    encoded_place_name = quote_plus(place_name)
    url = f'https://nominatim.openstreetmap.org/search?q={encoded_place_name}&format=json'

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()

        if data:
            
            first_result = data[0]
            return float(first_result['lat']), float(first_result['lon'])
        else:
            print(f"Place not found: {place_name}")
            return None
    else:
        print(f"Error occurred: {response.status_code}")
        return None


def create_viewport(center_lat, center_lng, lat_offset=0.002, lng_offset=0.002):

    viewport = {
        'northeast': {'lat': center_lat + lat_offset, 'lng': center_lng + lng_offset},
        'southwest': {'lat': center_lat - lat_offset, 'lng': center_lng - lng_offset},
    }
    
    return viewport

