from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# join tables
album_songs = db.Table("album_songs",
                       db.Column("albumId", db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), primary_key=True),
                       db.Column("songId", db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True)
                       )
if environment == "production":
        album_songs.schema = SCHEMA

playlist_songs = db.Table("play_songs",
                       db.Column("playlistId", db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), primary_key=True),
                       db.Column("songId", db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True)
                       )
if environment == "production":
        playlist_songs.schema = SCHEMA

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
    albums_user = db.relationship("Album", back_populates="user_albums")
    # 2. Songs.userId
    songs_user = db.relationship("Song", back_populates="user_songs")
    # 3. Playlists.userId
    playlists_user = db.relationship("Playlist", back_populates="user_playlists")

# Albums Model
class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_name = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    release_year = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.Date, nullable=False)
    updatedAt = db.Column(db.Date, nullable=False)

    # relationships
    # id has a one to many relationship with Albums_Songs.albumId
    songs = db.relationship("Song",
                            secondary=album_songs,
                            back_populates="albums")
    # userId has a many to one relationship with Users.id
    user_albums = db.relationship("User", back_populates="albums_user")

# Songs Model
class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_name = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.Date, nullable=False)
    updatedAt = db.Column(db.Date, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    song_url = db.Column(db.String(255), nullable=False)

    # relationships
    # id has a one to many relationship with Albums_Songs.songId
    albums = db.relationship("Album",
                            secondary=album_songs,
                            back_populates="songs")
    # id has a one to many relationship with Playlist_Songs.songId
    playlists = db.relationship("Playlist",
                            secondary=playlist_songs,
                            back_populates="songs")
    # userId has a many to one relationship with Users.id
    user_songs = db.relationship("User", back_populates="songs_user")


# Playlists Model
class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    playlist_name = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.Date, nullable=False)
    updatedAt = db.Column(db.Date, nullable=False)

    # relationships
    # id has a one to many relationship with Playlist_Songs.playlistId
    songs = db.relationship("Song",
                            secondary=playlist_songs,
                            back_populates="playlists")
    # userId has a many to one relationship with Users.
    user_playlists = db.relationship("User", back_populates="playlists_user")
