from flask import request, jsonify, render_template, redirect, url_for
from flask_login import login_user, login_required, logout_user, current_user
from models import app, db, User, Restaurant, Opinion, UserInteraction  # Import from models.py
import requests
from place_convert import get_coordinates as gc
from place_convert import create_viewport as cv

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.password == password:
            login_user(user)
            return redirect(url_for('index'))
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/')
@login_required
def index():
    return render_template('index.html')

@app.route('/find_places', methods=['POST'])
@login_required
def find_places_route():
    location = request.form['location']
    radius = request.form['radius']
    
    from find_places import find_places
    restaurants, viewport = find_places(location, radius)
    
    if restaurants is None:
        return jsonify({'error': 'Error finding places'}), 500
    return jsonify({'restaurants': restaurants, 'viewport': viewport}), 200

@app.route('/opinion', methods=['POST'])
@login_required
def opinion_route():
    restaurant_id = request.form['restaurant_id']
    opinion = request.form['opinion']
    new_opinion = Opinion(restaurant_id=restaurant_id, opinion=opinion)
    db.session.add(new_opinion)
    db.session.commit()
    return jsonify({'success': True}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)