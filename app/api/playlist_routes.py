import os
from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Playlist

playlist_routes = Blueprint('playlist', __name__)
DB_FILE = os.environ.get("DB_FILE")

#GET ALL PLAYLISTS OWNED BY CURRENT USER
 """
    a. Returns all playlists owned by current user.
    b. Authenticated user required for successful response.
    c. Successful response includes only playlists created by current user.
    d. Playlist data returned has id, userId, playlist_name, createdAt, and updatedAt.
    e. Playlist data also has User data: id, firstName, and lastName.
"""

#Route 1: Get Current User's Playlists
@playlist_routes.route('/user', methods=['GET'])
@login_required
def get_user_playlists_by_id():
    user_playlists = Playlist.query.filter_by(userId=current_user.id).all()
    playlists_data = all_playlists(user_playlists)
    return jsonify(playlists_data)

# Route 2: Get User Playlist by Id
@playlist_routes.route('/user/<int:id>', methods=['GET'])
def get_user_playlists(id):
    user_playlists = Playlist.query.filter_by(userId=id).all()
    playlists_data = all_playlists(user_playlists)
    return jsonify(playlists_data)

#Helper Function to Format All Playlist Data
def all_playlists(playlists):
    user_playlists = Playlist.query.filter_by(userId=current_user.id).all()
    playlists_data = []
    for playlist in user_playlists:
        playlist_data = {
            'id': playlist.id,
            'userId': playlist.userId,
            'playlist_name': playlist.playlist_name,
            'createdAt': playlist.createdAt,
            'updatedAt': playlist.updatedAt,
            'user': {
                'id': current_user.id,
                'firstName': current_user.firstName,
                'lastName': current_user.lastName
            }
        }
        playlists_data.append(playlist_data)

    return jsonify(playlists_data)
