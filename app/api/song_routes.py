from flask import Blueprint, jsonify, request
from app.models import db, Song, User
from app.forms.song_form import SongForm
from flask_login import current_user, login_required, login_user
import datetime
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
@login_required
def currentUserSongs():

    if song.userId != current_user.id:
        return {'errors': ['Forbidden: You dont have permission']}, 403

    user_songs = Song.query.filter_by(userId = current_user.id).all()

    user_info = User.query.get(current_user.id)

    user = {
        'id': user_info.id,
        'firstName': user_info.firstName,
        'lastName': user_info.lastName
    }

    song = [{'song': song.to_dict(), 'user': user} for song in user_songs]

    # return {'songs': [song.to_dict() for song in user_songs]}
    return {'songs': song}


"""
Returns the details of a song specified by its id.
"""
@song_routes.route('/<int:id>', methods=['GET'])
def songId(id):

    user_song = Song.query.filter_by(userId = current_user.id)

    song = Song.query.get(id)

    user_info = User.query.get(current_user.id)

    user = {
        'id': user_info.id,
        'firstName': user_info.firstName,
        'lastName': user_info.lastName
    }

    song_info = [{'song': song.to_dict(), 'user': user} for song in user_song]

    #error response:
    if song_info is None:
        return {'errors': ['Song does not exist with the provided Id']}, 404

    return song_info


"""
Creates and returns a new song
"""
@song_routes.route('/newsong', methods=['POST'])
@login_required
def createSong():
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        song = Song(
            song_name=form.data['song_name'],
            genre=form.data['genre'],
            image_url=form.data['image_url'],
            song_url=form.data['song_url'],
            userId = current_user.id,
        )
        db.session.add(song)
        db.session.commit()
        return song.to_dict()

    if form.errors:
        return form.errors

    return {'errors': ['Song wasn\'t posted :(']}, 401
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401


"""
Updates and returns an existing song.
"""
@song_routes.route('/<int:id>/edit', methods=['POST'])
@login_required
def update(id):
    song = Song.query.get(id)

    #error response:
    if song is None:
        return {'errors': ['Song does not exist with the provided Id']}, 404

    if song.userId != current_user.id:
        return {'errors': ['Forbidden: You dont have permission']}, 403

    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        song.song_name=form.data['song_name']
        song.genre=form.data['genre']
        song.image_url=form.data['image_url']
        song.song_url=form.data['song_url']

        db.session.commit()
        return song.to_dict()

    return {'errors': ['Update was not successful']}, 400


"""
Delete an existing song.
"""
@song_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete(id):
    song = Song.query.get(id)

    if song.userId != current_user.id:
        return {'errors': ['Forbidden: You dont have permission']}, 403

    print("!!!!!Debugging: Song found!!!!1:", song)
    print("!!!!!!Debugging: User ID !!!!!:", current_user.id)
    
    #error response:
    if song is None:
        return {'errors': ['Song does not exist with the provided Id']}, 404

    db.session.delete(song)
    db.session.commit()

    return { "message": 'Successfully deleted' }, 200
