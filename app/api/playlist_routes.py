from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Playlist

playlist_routes = Blueprint('playlist', __name__)
DB_FILE = os.environ.get("DB_FILE")

#Get Details of Playlist from Id
@playlist_routes.route('/user', methods=['GET'])
@login_required
def get_user_playlists():
    """
    Returns all playlists owned by current user.
    Authenticated user required for successful response.
    Successful response includes only playlists created by current user.
    Playlist data returned has id, userId, playlist_name, createdAt, and updatedAt.
    Playlist data also has User data: id, firstName, and lastName.
    """
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
