import requests
import json
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from place_convert import get_coordinates as gc
from place_convert import create_viewport as cv

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///restaurants.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.String(10), nullable=True)
    total_ratings = db.Column(db.Integer, nullable=True)


class Opinion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    opinion = db.Column(db.String(50), nullable=False)


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
                existing_restaurant = Restaurant.query.filter_by(name=restaurant_info['name'],
                                                                 address=restaurant_info['address']).first()
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


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/find_places', methods=['POST'])
def find_places_endpoint():
    location = request.form['location']
    radius = request.form['radius']
    restaurants, viewport = find_places(location, radius)
    if restaurants is not None:
        return jsonify({'restaurants': restaurants, 'viewport': viewport})
    else:
        return jsonify({'error': 'Unable to find places'}), 500


@app.route('/opinion', methods=['POST'])
def opinion():
    restaurant_id = request.form['restaurant_id']
    opinion = request.form['opinion']

    new_opinion = Opinion(restaurant_id=restaurant_id, opinion=opinion)
    db.session.add(new_opinion)
    db.session.commit()

    return jsonify({'success': True})


@app.route('/opinions')
def opinions():
    restaurant_opinions = {}
    opinions = Opinion.query.all()
    for opinion in opinions:
        restaurant = Restaurant.query.get(opinion.restaurant_id)
        if restaurant.name not in restaurant_opinions:
            restaurant_opinions[restaurant.name] = {'like': 0, 'dislike': 0, 'no_opinion': 0}
        restaurant_opinions[restaurant.name][opinion.opinion] += 1
    return jsonify(restaurant_opinions)


@app.route('/top_restaurants', methods=['GET', 'POST'])
def top_restaurants():
    if request.method == 'POST':
        criteria = request.form['criteria']
        if criteria == 'most_likes':
            top_restaurants = db.session.query(Restaurant, db.func.count(Opinion.id).label('total_likes')).join(
                Opinion).filter(Opinion.opinion == 'like').group_by(Restaurant.id).order_by(
                db.desc('total_likes')).limit(3).all()
        elif criteria == 'most_dislikes':
            top_restaurants = db.session.query(Restaurant, db.func.count(Opinion.id).label('total_dislikes')).join(
                Opinion).filter(Opinion.opinion == 'dislike').group_by(Restaurant.id).order_by(
                db.desc('total_dislikes')).limit(3).all()
        else:
            top_restaurants = []
        return render_template('top_restaurants.html', top_restaurants=top_restaurants, criteria=criteria)
    return render_template('top_restaurants.html', top_restaurants=None)


def main():
    with app.app_context():
        db.create_all()
    app.run(debug=True)


if __name__ == '__main__':
    main()
