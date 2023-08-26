from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# join tables here?
album_songs = db.Table()

playlist_songs = db.Table()

# Users Model
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'username': self.username,
            'email': self.email
        }

    # relationships
    # Users.id has one to many relationships with:
    # 1. Albums.userId
    # 2. Songs.userId
    # 3. Playlists.userId


# Albums Model
class Album(db.Model, UserMixin):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_name = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    release_year = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.Date, nullable=False)
    updatedAt = db.Column(db.Date, nullable=False)

    # relationships
    # id has a one to many relationship with Albums_Songs.albumId
    # userId has a many to one relationship with Users.id

# Songs Model
class Song(db.Model, UserMixin):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_name = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.Date, nullable=False)
    updatedAt = db.Column(db.Date, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    song_url = db.Column(db.String(255), nullable=False)

    # relationships
    # id has a one to many relationship with Albums_Songs.songId
    # id has a one to many relationship with Playlist_Songs.songId
    # userId has a many to one relationship with Users.id


# Playlists Model
class Playlist(db.Model, UserMixin):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, nullable=False)
    playlist_name = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.Date, nullable=False)
    updatedAt = db.Column(db.Date, nullable=False)

    # relationships
    # id has a one to many relationship with Playlist_Songs.playlistId
    # userId has a many to one relationship with Users.
