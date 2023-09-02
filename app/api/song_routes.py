from flask import Blueprint, jsonify
from app.models import db, Song
from app.forms.song_form import SongForm
from flask_login import current_user, login_required
import os

song_routes = Blueprint('songs', __name__)
# DB_FILE = os.environ.get("DB_FILE")


"""
Returns all the songs
"""
@song_routes.route('/main', methods=['GET'])
def getAllSongs():
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}

#return one song by id
# @song_routes.route('/<int:id>')
# def oneSong(id):
#     print(id)
#     return

#create new song
# @song_routes.route('/new')
# def createSong():
#     form = SongForm()
