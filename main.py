import requests
import dotenv
from place_convert import get_place_coordinates as gc


url = "https://map-places.p.rapidapi.com/nearbysearch/json"

querystring = {"location":"-33.8670522,151.1957362","radius":"50", "type":"restaurant"}

headers = {
	"x-rapidapi-key": "8e6c13aa22msh3f97d2cafc6450cp15db5ajsn5400b369bf56",
	"x-rapidapi-host": "map-places.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)
place_name = 'University of Michigan'
coordinates = gc(place_name)

if coordinates:
    latitude, longitude = coordinates

#print(response.json())
# JSON parser
response_data = {
    'html_attributions': [],
    'results': [
        {
            'business_status': 'OPERATIONAL',
            'geometry': {
                'location': {'lat': latitude, 'lng': longitude},
                'viewport': {
                    'northeast': {'lat': -33.86577061970849, 'lng': 151.1968554802915},
                    'southwest': {'lat': -33.86846858029149, 'lng': 151.1941575197085}
                }
            },
            'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
            'name': 'The Century by Golden Century',
            'opening_hours': {'open_now': False},
            'photos': [
                {
                    'height': 4032,
                    'html_attributions': ['<a href="https://maps.google.com/maps/contrib/101519803336536116649">Victoria Devyan</a>'],
                    'photo_reference': 'AUc7tXXX...',
                    'width': 3024
                }
            ],
            'place_id': 'ChIJ1-v38TauEmsRNrXszdcSywQ',
            'plus_code': {
                'compound_code': '45MW+55 Pyrmont NSW, Australia',
                'global_code': '4RRH45MW+55'
            },
            'price_level': 3,
            'rating': 3.8,
            'reference': 'ChIJ1-v38TauEmsRNrXszdcSywQ',
            'scope': 'GOOGLE',
            'types': ['bar', 'restaurant', 'food', 'point_of_interest', 'establishment'],
            'user_ratings_total': 479,
            'vicinity': 'The Star Sydney 80 Pyrmont Street Entry via, Pirrama Road, Pyrmont'
        }
        # ... There might be more entries here
    ],
    'status': 'OK'
}

# Check if the response 'status' is 'OK'
if response_data['status'] == 'OK':
    # Access the list of places within the 'results' key
    for place in response_data['results']:
        # Access the details of each place
        name = place['name']
        address = place['vicinity']
        rating = place.get('rating', 'No rating')  # Use .get for safe access in case the key is not present
        latitude = place['geometry']['location']['lat']
        longitude = place['geometry']['location']['lng']
        open_now = place['opening_hours']['open_now'] if 'opening_hours' in place else 'Unknown'

        # Print the details (or process them as needed)
        print(f"Name: {name}")
        print(f"Address: {address}")
        print(f"Rating: {rating}")
        print(f"Location: {latitude}, {longitude}")
        print(f"Open Now: {open_now}")
        print("--------------------")
else:
    print("No results found or error in the API call")