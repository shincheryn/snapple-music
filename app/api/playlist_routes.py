from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.forms import PlaylistForm
from app.models import db, User, Playlist, Song, playlist_songs

playlist_routes = Blueprint('playlist', __name__)

#GET ALL PLAYLISTS OWNED BY CURRENT USER
"""
    a. Returns all playlists owned by current user.
    b. Authenticated user required for successful response.
    c. Successful response includes only playlists created by current user.
    d. Playlist data returned has id, userId, playlist_name, createdAt, and updatedAt.
    e. Playlist data also has current user data: id, firstName, and lastName.
"""

#Route 1: Get Current User's Playlists
@playlist_routes.route('/owned', methods=['GET'])
@login_required
def get_user_playlists_by_id():
    current_user_id = current_user.get_id()
    owned = Playlist.query.filter(Playlist.userId == current_user.id)
    return jsonify({'Playlists':[each.to_dict() for each in owned]})

# # Route 2: Get User Playlist by Id
# @playlist_routes.route('/owned/<int:id>', methods=['GET'])
# def get_user_playlists(id):
#     user_playlists = Playlist.query.filter(Playlist.userId==id)
#     playlists_data = all_playlists(user_playlists)
#     return jsonify({'Playlists':[each.to_dict() for each in owned]})

# #Helper Function to Format All Playlist Data
# def all_playlists(playlists):
#     user_playlists = Playlist.query.filter(Playlist.userId==current_user.id)
#     playlists_data = []
#     for playlist in user_playlists:
#         playlist_data = {
#             'id': playlist.id,
#             'userId': playlist.userId,
#             'playlist_name': playlist.playlist_name,
#             'createdAt': playlist.createdAt,
#             'updatedAt': playlist.updatedAt,
#             'user': {
#                 'id': current_user.id,
#                 'firstName': current_user.firstName,
#                 'lastName': current_user.lastName
#             }
#         }
#         playlists_data.append(playlist_data)

#     return jsonify(playlists_data)

# ------------------------------------------------------------------------------ #

#GET DETAILS OF A PLAYLIST FROM ID
@playlist_routes.route('/<int:playlistId>', methods=['GET'])
@login_required
def get_playlist_details(playlistId):
    """
        a. Gets details of playlist specified by playlist id.
        b. Authenticated user required for successful response.
        c. If current user is not authenticated user for playlist, access denied.
        d. Playlist data returned has id, userId, playlist_name, createdAt, and updatedAt.
        e. Playlist data also has current user data: id, firstName, and lastName.
    """
    # Find playlist by id
    playlist = Playlist.query.get(playlistId)

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
@playlist_routes.route('/create', methods=['POST'])
@login_required
def create_playlist():
    """
        a. Creates and returns new playlist.
        b. Requires user authentication.
        c. New playlist will exist in the database after successful request.
        d. Playlist data returned has id, userId, playlist_name, createdAt, and updatedAt.
        e.  Error response with status 400 is given when body validations for the userId or playlist_name are violated
    """
    form = PlaylistForm()
    current_user_id = current_user.get_id()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new = Playlist(
            userId=current_user.id,
            playlist_name=form.data['playlist_name'],
        )
        db.session.add(new)
        db.session.commit()
        return new.to_dict()

    return {'errors': [form.errors]}, 401

# ------------------------------------------------------------------------------ #

# ADD A SONG TO PLAYLIST BASED ON PLAYLIST ID
@playlist_routes.route('/<int:playlistId>/songs/<int:songId>', methods=['POST'])
@login_required
def add_song_to_playlist(playlistId, songId):
    """
    a. Add and return song to a playlist specified by playlist id
    b. Authenticated user required for successful response.
    """
    # Find playlist by id (join table)
    playlist_ID = Playlist.query.get(playlistId)
    song_ID = Song.query.get(songId)

    if playlist_ID is None:
        return jsonify({'message': 'Playlist not found', 'statusCode': 404}), 404

    if song_ID is None:
        return jsonify({'message': 'Song not found', 'statusCode': 404}), 404

    # Check that requested playlist belongs to current user
    # if playlistId != current_user.id:
    #     return jsonify({'message': 'Access denied', 'statusCode': 403}), 403

    # Parse JSON data request to check for necessary information
    # data = request.get_json()

    # Check if song is already in playlist
    # if any(Song.id == song_ID for song in Playlist_Songs.songId):
    #     return jsonify({'message': 'Playlist aready has this song', 'statusCode': 403}), 403

    # if not song_ID:
        # return jsonify({'message': 'Song not found', 'statusCode': 404}), 404

    # # Add song to playlist
    # Playlist.songs.append(song)
    # db.session.commit()

    new_song = playlist_songs.insert().values(
        playlistId=playlistId, songId=songId
    )

    db.session.execute(new_song)
    db.session.commit()

    return {'message':  "Successfully added song to album"}, 200

    # Format and return playlist with newly added song
    # playlist_data = {
    #     'id': playlist.id,
    #     'playlist_name': playlist.playlist_name,
    #     'username': current_user.username,
    #     'createdAt': playlist.createdAt,
    #     'updatedAt': playlist.updatedAt,
    #     'Songs': [
    #         {
    #             'id': song.id,
    #             'song_name': song.song_name,
    #             'username': song.username,
    #             'genre': song.genre,
    #             'createdAt': song.createdAt,
    #             'updatedAt': song.updatedAt,
    #             'image_url': song.image_url,
    #             'song_url': song.song_url
    #         }
    #     ]
    # }

    # return jsonify(playlist_data), 201

# ------------------------------------------------------------------------------ #

# DELETE SONG FROM PLAYLIST BASED ON PLAYLIST ID
@playlist_routes.route('/<int:playlistId>/songs/<int:songId>', methods=["DELETE"])
@login_required
def delete_song_from_playlist(playlistId, songId):
    # Find playlist by id (join table)
    playlist_ID = Playlist.query.get(playlistId)
    song_ID = Song.query.get(songId)

    if playlist_ID is None:
        return jsonify({'message': 'Playlist not found', 'statusCode': 404}), 404

    if song_ID is None:
        return jsonify({'message': 'Song not found', 'statusCode': 404}), 404

    # Check that requested playlist belongs to current user
    if Playlist.id != current_user.id:
        return jsonify({'message': 'Access denied', 'statusCode': 403}), 403

    db.session.query(playlist_songs).filter(playlist_songs.c.playlistId == playlistId and playlist_songs.c.songId == songId).delete()
    db.session.commit()
    return {'message':  "Successfully deleted"}, 200

# ------------------------------------------------------------------------------ #

# DELETE A PLAYLIST
@playlist_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_playlist(id):
    playlist_id = Playlist.query.get(id)
    if playlist_id is None:
        return jsonify({'message': 'Playlist not found', 'statusCode': 404}), 404
    db.session.delete(playlist_id)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted', 'statusCode': 200}), 200
