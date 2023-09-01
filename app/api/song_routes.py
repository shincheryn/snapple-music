from flask import Blueprint, jsonify
from app.models import db, Song
from app.forms.song_form import SongForm
import os

song_routes = Blueprint('songs', __name__)
# DB_FILE = os.environ.get("DB_FILE")

#get all songs
@song_routes.route('/')
def songs():
    songs = Song.query.all()
    return {'songs': songs}

#return one song by id
@song_routes.route('/<int:id>')
def oneSong(id):
    print(id)
    return

#create new song
@song_routes.route('/new')
def createSong():
    form = SongForm()
