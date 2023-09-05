import os
from flask import Blueprint, jsonify, request
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
    e. Playlist data also has current user data: id, firstName, and lastName.
"""

#Route 1: Get Current User's Playlists
@playlist_routes.route('/playlists/owned', methods=['GET'])
@login_required
def get_user_playlists_by_id():
    user_playlists = Playlist.query.filter_by(userId=current_user.id).all()
    playlists_data = all_playlists(user_playlists)
    return jsonify(playlists_data)

# Route 2: Get User Playlist by Id
@playlist_routes.route('/playlists/owned/<int:id>', methods=['GET'])
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

# ------------------------------------------------------------------------------ #

#GET DETAILS OF A PLAYLIST FROM ID
@playlist_routes.route('/playlists/<int:playlist_id>', methods=['GET'])
@login_required
def get_playlist_details(playlist_id):
    """
    a. Gets details of playlist specified by playlist id.
    b. Authenticated user required for successful response.
    c. If current user is not authenticated user for playlist, access denied.
    d. Playlist data returned has id, userId, playlist_name, createdAt, and updatedAt.
    e. Playlist data also has current user data: id, firstName, and lastName.
    """
    # Find playlist by id
    playlist = Playlist.query.get(playlist_id)

    if not playlist:
        return jsonify({'error': 'Playlist not found'}), 404

    # Ensure that requested playlist belongs to current user
    if playlist.userId != current_user.id:
        return jsonify({'error': 'Access denied'}), 403

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

    return jsonify(playlist_data)

# ------------------------------------------------------------------------------ #

# CREATE A PLAYLIST
@playlist_routes.route('/playlists/create', methods=['POST'])
@login_required
def create_playlist():
    """
        a. Creates and returns new playlist.
        b. Requires user authentication.
        c. New playlist will exist in the database after successful request.
        d. Playlist data returned has id, userId, playlist_name, createdAt, and updatedAt.
        e.  Error response with status 400 is given when body validations for the userId or playlist_name are violated
    """

    #Get requested data
    try:
        data = request.get_json()

    #Check if request body is valid
    if 'userId' not in data or 'playlist_name' not in data:
        return jsonify({'error': 'userId and playlist_name are required'}), 400

    #Create new playlist
    new_playlist = Playlist(
        userId=current_user.id,
        playlist_name=data['playlist_name']
    )

    #Add new playlist to database
    db.session.add(new_playlist)
    db.session.commit()

    #Return new playlist
    playlist_data = {
        'id': new_playlist.id,
        'userId': new_playlist.userId,
        'playlist_name': new_playlist.playlist_name,
        'createdAt': new_playlist.createdAt,
        'updatedAt': new_playlist.updatedAt
    }

    return jsonify(playlist_data), 201

except Exception as e:
    return jsonify({'error':str(e)}), 400
