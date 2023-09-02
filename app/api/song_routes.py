from flask import Blueprint, jsonify, request
from app.models import db, Song
from app.forms.song_form import SongForm
from flask_login import current_user, login_required, login_user
import os

song_routes = Blueprint('songs', __name__)


"""
Returns all the songs
"""
@song_routes.route('/main', methods=['GET'])
def getAllSongs():
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}


"""
Returns all songs owned by the current user.
"""
@song_routes.route('/currentuser', methods=['GET'])
def currentUserSongs():
    pass


"""
Returns the details of a song specified by its id.
"""
@song_routes.route('/<int:id>', methods=['GET'])
def songId(id):
    song = Song.query.get(id)

    #error response:
    if song is None:
        return {'errors': ['Song does not exist with the provided Id']}, 404

    return song.to_dict()


"""
Creates and returns a new song
"""
@song_routes.route('/new', methods=['GET', 'POST'])
def createSong():
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        song = Song(
            song_name=form.data['song_name'],
            genre=form.data['genre'],
            image_url=form.data['image_url'],
            song_url=form.data['song_url']
        )
        db.session.add(song)
        db.session.commit()
        login_user(song)
        return song.to_dict()
    return {'errors': ['Song wasnt posted :(']}, 401
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
