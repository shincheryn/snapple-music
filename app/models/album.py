from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Album(db.Model, UserMixin):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_name = db.Column(db.String(255), nullable=False, unique=True)
    userId = db.Column(db.Integer, nullable=False, unique=True)
    release_year = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.Date, nullable=False)
    updatedAt = db.Column(db.Date, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'album_name': self.album_name,
            'userId': self.userId,
            'genre': self.genre,
            'description': self.description,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
