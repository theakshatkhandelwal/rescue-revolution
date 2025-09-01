from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='static')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

# Handle database URL for Render deployment
database_url = os.getenv('DATABASE_URL', 'sqlite:///rescue_revolution.db')
if database_url.startswith('postgres://'):
    database_url = database_url.replace('postgres://', 'postgresql://', 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
CORS(app)

# Database Models
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_admin = db.Column(db.Boolean, default=False)
    
    pets = db.relationship('Pet', backref='owner', lazy=True)
    incidents = db.relationship('Incident', backref='reporter', lazy=True)

class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    species = db.Column(db.String(50), nullable=False)
    breed = db.Column(db.String(100))
    age = db.Column(db.Integer)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(500))
    status = db.Column(db.String(20), default='available')  # available, adopted, lost
    location = db.Column(db.String(200))
    contact_info = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Incident(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    incident_type = db.Column(db.String(50), nullable=False)  # lost_pet, found_pet, abuse, emergency
    contact_info = db.Column(db.String(200))
    status = db.Column(db.String(20), default='open')  # open, resolved, closed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Authentication routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    user = User(
        username=data['username'],
        email=data['email'],
        password_hash=generate_password_hash(data['password'])
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    
    if user and check_password_hash(user.password_hash, data['password']):
        login_user(user)
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_admin': user.is_admin
            }
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/auth/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'})

@app.route('/api/auth/user', methods=['GET'])
@login_required
def get_user():
    return jsonify({
        'id': current_user.id,
        'username': current_user.username,
        'email': current_user.email,
        'is_admin': current_user.is_admin
    })

# Pet routes
@app.route('/api/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    return jsonify([{
        'id': pet.id,
        'name': pet.name,
        'species': pet.species,
        'breed': pet.breed,
        'age': pet.age,
        'description': pet.description,
        'image_url': pet.image_url,
        'status': pet.status,
        'location': pet.location,
        'contact_info': pet.contact_info,
        'created_at': pet.created_at.isoformat(),
        'owner': pet.owner.username
    } for pet in pets])

@app.route('/api/pets', methods=['POST'])
@login_required
def create_pet():
    data = request.get_json()
    
    pet = Pet(
        name=data['name'],
        species=data['species'],
        breed=data.get('breed'),
        age=data.get('age'),
        description=data.get('description'),
        image_url=data.get('image_url'),
        status=data.get('status', 'available'),
        location=data.get('location'),
        contact_info=data.get('contact_info'),
        user_id=current_user.id
    )
    
    db.session.add(pet)
    db.session.commit()
    
    return jsonify({
        'id': pet.id,
        'name': pet.name,
        'species': pet.species,
        'breed': pet.breed,
        'age': pet.age,
        'description': pet.description,
        'image_url': pet.image_url,
        'status': pet.status,
        'location': pet.location,
        'contact_info': pet.contact_info,
        'created_at': pet.created_at.isoformat(),
        'owner': pet.owner.username
    }), 201

@app.route('/api/pets/<int:pet_id>', methods=['GET'])
def get_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    return jsonify({
        'id': pet.id,
        'name': pet.name,
        'species': pet.species,
        'breed': pet.breed,
        'age': pet.age,
        'description': pet.description,
        'image_url': pet.image_url,
        'status': pet.status,
        'location': pet.location,
        'contact_info': pet.contact_info,
        'created_at': pet.created_at.isoformat(),
        'owner': pet.owner.username
    })

@app.route('/api/pets/<int:pet_id>', methods=['PUT'])
@login_required
def update_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    
    if pet.user_id != current_user.id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    
    pet.name = data.get('name', pet.name)
    pet.species = data.get('species', pet.species)
    pet.breed = data.get('breed', pet.breed)
    pet.age = data.get('age', pet.age)
    pet.description = data.get('description', pet.description)
    pet.image_url = data.get('image_url', pet.image_url)
    pet.status = data.get('status', pet.status)
    pet.location = data.get('location', pet.location)
    pet.contact_info = data.get('contact_info', pet.contact_info)
    
    db.session.commit()
    
    return jsonify({
        'id': pet.id,
        'name': pet.name,
        'species': pet.species,
        'breed': pet.breed,
        'age': pet.age,
        'description': pet.description,
        'image_url': pet.image_url,
        'status': pet.status,
        'location': pet.location,
        'contact_info': pet.contact_info,
        'created_at': pet.created_at.isoformat(),
        'owner': pet.owner.username
    })

@app.route('/api/pets/<int:pet_id>', methods=['DELETE'])
@login_required
def delete_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    
    if pet.user_id != current_user.id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    
    db.session.delete(pet)
    db.session.commit()
    
    return jsonify({'message': 'Pet deleted successfully'})

# Incident routes
@app.route('/api/incidents', methods=['GET'])
def get_incidents():
    incidents = Incident.query.all()
    return jsonify([{
        'id': incident.id,
        'title': incident.title,
        'description': incident.description,
        'location': incident.location,
        'incident_type': incident.incident_type,
        'contact_info': incident.contact_info,
        'status': incident.status,
        'created_at': incident.created_at.isoformat(),
        'reporter': incident.reporter.username
    } for incident in incidents])

@app.route('/api/incidents', methods=['POST'])
@login_required
def create_incident():
    data = request.get_json()
    
    incident = Incident(
        title=data['title'],
        description=data['description'],
        location=data['location'],
        incident_type=data['incident_type'],
        contact_info=data.get('contact_info'),
        user_id=current_user.id
    )
    
    db.session.add(incident)
    db.session.commit()
    
    return jsonify({
        'id': incident.id,
        'title': incident.title,
        'description': incident.description,
        'location': incident.location,
        'incident_type': incident.incident_type,
        'contact_info': incident.contact_info,
        'status': incident.status,
        'created_at': incident.created_at.isoformat(),
        'reporter': incident.reporter.username
    }), 201

@app.route('/api/incidents/<int:incident_id>', methods=['GET'])
def get_incident(incident_id):
    incident = Incident.query.get_or_404(incident_id)
    return jsonify({
        'id': incident.id,
        'title': incident.title,
        'description': incident.description,
        'location': incident.location,
        'incident_type': incident.incident_type,
        'contact_info': incident.contact_info,
        'status': incident.status,
        'created_at': incident.created_at.isoformat(),
        'reporter': incident.reporter.username
    })

@app.route('/api/incidents/<int:incident_id>', methods=['PUT'])
@login_required
def update_incident(incident_id):
    incident = Incident.query.get_or_404(incident_id)
    
    if incident.user_id != current_user.id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    
    incident.title = data.get('title', incident.title)
    incident.description = data.get('description', incident.description)
    incident.location = data.get('location', incident.location)
    incident.incident_type = data.get('incident_type', incident.incident_type)
    incident.contact_info = data.get('contact_info', incident.contact_info)
    incident.status = data.get('status', incident.status)
    
    db.session.commit()
    
    return jsonify({
        'id': incident.id,
        'title': incident.title,
        'description': incident.description,
        'location': incident.location,
        'incident_type': incident.incident_type,
        'contact_info': incident.contact_info,
        'status': incident.status,
        'created_at': incident.created_at.isoformat(),
        'reporter': incident.reporter.username
    })

@app.route('/api/incidents/<int:incident_id>', methods=['DELETE'])
@login_required
def delete_incident(incident_id):
    incident = Incident.query.get_or_404(incident_id)
    
    if incident.user_id != current_user.id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    
    db.session.delete(incident)
    db.session.commit()
    
    return jsonify({'message': 'Incident deleted successfully'})

# Search routes
@app.route('/api/search/pets', methods=['GET'])
def search_pets():
    query = request.args.get('q', '')
    species = request.args.get('species', '')
    status = request.args.get('status', '')
    
    pets = Pet.query
    
    if query:
        pets = pets.filter(Pet.name.contains(query) | Pet.description.contains(query))
    if species:
        pets = pets.filter(Pet.species == species)
    if status:
        pets = pets.filter(Pet.status == status)
    
    pets = pets.all()
    
    return jsonify([{
        'id': pet.id,
        'name': pet.name,
        'species': pet.species,
        'breed': pet.breed,
        'age': pet.age,
        'description': pet.description,
        'image_url': pet.image_url,
        'status': pet.status,
        'location': pet.location,
        'contact_info': pet.contact_info,
        'created_at': pet.created_at.isoformat(),
        'owner': pet.owner.username
    } for pet in pets])

@app.route('/api/search/incidents', methods=['GET'])
def search_incidents():
    query = request.args.get('q', '')
    incident_type = request.args.get('type', '')
    status = request.args.get('status', '')
    
    incidents = Incident.query
    
    if query:
        incidents = incidents.filter(Incident.title.contains(query) | Incident.description.contains(query))
    if incident_type:
        incidents = incidents.filter(Incident.incident_type == incident_type)
    if status:
        incidents = incidents.filter(Incident.status == status)
    
    incidents = incidents.all()
    
    return jsonify([{
        'id': incident.id,
        'title': incident.title,
        'description': incident.description,
        'location': incident.location,
        'incident_type': incident.incident_type,
        'contact_info': incident.contact_info,
        'status': incident.status,
        'created_at': incident.created_at.isoformat(),
        'reporter': incident.reporter.username
    } for incident in incidents])

# Serve React app
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
